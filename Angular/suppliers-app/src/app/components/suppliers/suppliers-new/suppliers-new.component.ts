import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { SupplierRequestDTO } from './../../../interfaces/supplierInterface';
import { Title } from '@angular/platform-browser';

import { phoneCountryCodes } from '../../../data/locationDatabase';

import { FiscalConditionService } from '../../../services/fiscal-condition.service';
import { LocationService } from '../../../services/location.service';
import { ModalService } from '../../../services/modal.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { SuppliersService } from '../../../services/suppliers.service';

import { LocationResponseDTO } from '../../../interfaces/locationInterface';
import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { SmallCrudInterface } from '../../../interfaces/smallCrudsInterfaces';
import { CuitPipePipe } from '../../../pipes/cuit-pipe.pipe';

@Component({
  selector: 'suppliers-new',
  templateUrl: './suppliers-new.component.html',
  styleUrl: './suppliers-new.component.css',
})
export class suppliersNewComponent implements OnInit {
  constructor(
    private fiscalService: FiscalConditionService,
    private locationService: LocationService,
    private modalService: ModalService,
    private smallCrudsService: SmallCrudsService,
    private supplierService: SuppliersService,
    private cuitPipe: CuitPipePipe,

    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  currentsupplier: SupplierRequestDTO = {
    brand: '',
    sectorId: -1,
    web: '',
    logo: '',
    phone: { country: 54, number: '' },
    fullAddress: {
      address: '',
      addressNumber: undefined,
      provinceId: -1,
      city: '',
      zipCode: '',
    },
    cuit: '',
    fiscalConditionId: -1,
    contact: {
      mail: '',
      name: '',
      phone: { country: 54, number: '' },
      rol: '',
      surname: '',
    },
  };
  currentSupplierId!: number;
  inputCuit: string = '';
  selectedCountry: number = -1;

  countryCodes = phoneCountryCodes;
  fiscalConditions: SmallCrudInterface[] = [];
  locationOptions: LocationResponseDTO[] = [];
  sectors: SmallCrudInterface[] = [];
  isCreatingSector: boolean = false;

  issupplierInvalid: any = {
    brand: false,
    sector: false,
    phone: false,
    web: false,
    fullAddresAddress: false,
    fullAddresAddressNumber: false,
    fullAddresCity: false,
    fullAddresZIP: false,
    cuit: false,
    iva: false,
    contactName: false,
    contactSurname: false,
    contactPhone: false,
    contactMail: false,
    contactRol: false,
  };
  cuitExistFlag: boolean = false;

  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;
  triedToLeave: boolean = false;

  isUpdating: boolean = false;

  private debouncer: Subject<void> = new Subject<void>();
  private debouncerSubscription?: Subscription;

  ngOnInit(): void {
    this.modalService.confirmLeave$.subscribe(
      (response) => (this.triedToLeave = response)
    );

    this.locationService
      .getList()
      .subscribe((list) => (this.locationOptions = list));

    this.fiscalService
      .getList()
      .subscribe((list) => (this.fiscalConditions = list));

    this.smallCrudsService
      .getList('sector')
      .subscribe((secList) => (this.sectors = secList));
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null) {
        if (!isNaN(Number(id))) {
          this.currentSupplierId = Number(id);
          this.supplierService.getElementForUpdate(parseInt(id)).subscribe({
            next: (apiResponse) => {
              let response = apiResponse.data;
              this.locationService
                .getCountryId(response.fullAddress.provinceId)
                .subscribe((countryId) => (this.selectedCountry = countryId));
              this.currentsupplier = response;
              this.inputCuit = this.cuitPipe.transform(response.cuit);
              this.titleService.setTitle(`Editar ${response.brand}`);
            },
            error: (error) => {
              this.modalRedirectObject = {
                header: 'Error',
                message: error.error.message,
                path: '/suppliers',
              };
              this.modalRedirectFlag = true;
              console.error(error);
            },
          });
          this.isUpdating = true;
        } else this.router.navigateByUrl('/404');
      }

      this.debouncerSubscription = this.debouncer
        .pipe(debounceTime(1000))
        .subscribe(() => {
          this.checkCuitExists();
        });
    });
  }

  savesupplier(): void {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.issupplierInvalid).forEach((key) => {
      if (isFormValid && this.issupplierInvalid[key]) {
        this.modalMessageObject = {
          header: `Hay errores en el formulario.`,
          confirm: 'Continuar editando',
        };
        this.modalMessageFlag = true;
        isFormValid = false;
      }
    });
    if (isFormValid && !this.cuitExistFlag) {
      this.completeUrl;
      if (this.isUpdating) {
        this.supplierService
          .updateElement(this.currentSupplierId, this.currentsupplier)
          .subscribe({
            next: (response) => {
              this.modalRedirectObject = {
                header: `Proveedor ${response.data.brand} actualizado con éxito.`,
                path: '/suppliers',
              };
              this.modalRedirectFlag = true;
              this.debouncerSubscription!.unsubscribe();
            },
            error: (error) => {
              this.handleError(error);
              isFormValid = false;
            },
          });
      } else {
        this.supplierService.addElement(this.currentsupplier).subscribe({
          next: (response) => {
            this.modalRedirectObject = {
              header: `Proveedor ${response.data.brand} cargado con éxito.`,
              path: '/suppliers',
            };
            this.modalRedirectFlag = true;
            this.debouncerSubscription!.unsubscribe();
          },
          error: (error) => {
            this.handleError(error);
            isFormValid = false;
          },
        });
      }
    }
  }

  getProvinces(countryId: number): SmallCrudInterface[] {
    return (
      this.locationOptions.find((location) => location.countryId == countryId)
        ?.provinces || []
    );
  }

  createNewSector() {
    this.isCreatingSector = true;
    let subsciption = this.modalService.confirmModal$.subscribe((response) => {
      this.smallCrudsService
        .getList('sector')
        .subscribe((secList) => (this.sectors = secList));
      this.isCreatingSector = false;
      subsciption.unsubscribe();
    });
  }

  validateMailInput(mail: NgModel): boolean {
    if (mail.valid) {
      return this.validateMail(mail.value);
    }
    return false;
  }

  private validateMail(mail: string): boolean {
    // Returns true if valid
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
  }

  validateCuitInput(cuit: NgModel): boolean {
    if (cuit.valid) {
      return this.validateCuit(cuit.value);
    }
    return false;
  }

  validateCuit(cuit: string): boolean {
    // returns true if valid.
    return !/[^0-9]/.test(cuit);
  }

  private checkCuitExists(): void {
    this.supplierService
      .checkCuitExists(this.currentsupplier.cuit)
      .subscribe((exists) => (this.cuitExistFlag = exists));
  }

  public onKeyPressCuit(): void {
    this.currentsupplier.cuit = this.inputCuit.replace(/\D/g, '');
    this.debouncer.next();
  }

  private validatePhoneNumber(number: string | undefined): boolean {
    return (
      number !== undefined &&
      /^[1-9][0-9]*$/.test(number) &&
      number.length > 9 &&
      number.length < 14
    );
  }

  private completeUrl(): void {
    let url: string = this.currentsupplier.web;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      !url.startsWith('www.')
        ? (url = 'https://www.' + url)
        : (url = 'https://' + url);
    }
    this.currentsupplier.web = url;
  }

  private validateSubmite() {
    if (!this.isUpdating) {
      this.checkCuitExists();
    }

    this.issupplierInvalid.brand =
      this.currentsupplier.brand.length < 4 ||
      this.currentsupplier.brand.length > 60;
    this.issupplierInvalid.sector = this.currentsupplier.sectorId == -1;
    this.issupplierInvalid.phone = !this.validatePhoneNumber(
      this.currentsupplier.phone.number
    );
    this.issupplierInvalid.web =
      this.currentsupplier.web.length < 4 ||
      this.currentsupplier.web.length > 60;
    this.issupplierInvalid.fullAddressAddress =
      this.currentsupplier.fullAddress.address.length < 4 ||
      this.currentsupplier.fullAddress.address.length > 60;
    this.issupplierInvalid.fullAddressAddressNumber =
      !this.currentsupplier.fullAddress.addressNumber ||
      this.currentsupplier.fullAddress.addressNumber < 0;
    this.issupplierInvalid.fullAddressCity =
      this.currentsupplier.fullAddress.city.length < 4 ||
      this.currentsupplier.fullAddress.city.length > 60;
    this.issupplierInvalid.fullAddressZIP =
      this.currentsupplier.fullAddress.zipCode.length < 3 ||
      this.currentsupplier.fullAddress.zipCode.length > 6;
    this.issupplierInvalid.cuit =
      !this.validateCuit(this.currentsupplier.cuit) ||
      this.currentsupplier.cuit.length < 10 ||
      this.currentsupplier.cuit.length > 13;
    this.issupplierInvalid.iva = this.currentsupplier.fiscalConditionId === -1;
    this.issupplierInvalid.contactName =
      this.currentsupplier.contact.name.length < 4 ||
      this.currentsupplier.contact.name.length > 30;
    this.issupplierInvalid.contactSurname =
      this.currentsupplier.contact.surname.length < 4 ||
      this.currentsupplier.contact.surname.length > 30;
    this.issupplierInvalid.contactPhone = !this.validatePhoneNumber(
      this.currentsupplier.contact.phone.number
    );
    this.issupplierInvalid.contactMail =
      this.currentsupplier.contact.mail.length < 4 ||
      this.currentsupplier.contact.mail.length > 40 ||
      !this.validateMail(this.currentsupplier.contact.mail);
    this.issupplierInvalid.contactRol =
      this.currentsupplier.contact.rol.length < 4 ||
      this.currentsupplier.contact.rol.length > 40;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 0) {
      this.modalRedirectObject = {
        header: 'Error',
        message: 'Hubo un error con el servidor.',
        path: '/supliers',
      };
      this.modalRedirectFlag = true;
    } else {
      this.modalMessageObject = {
        header: 'Hubo errores con el formulario.',
        message: error.error.message,
        confirm: 'Continuar editando',
      };
      this.modalMessageFlag = true;
    }
  }
}
