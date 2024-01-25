import { SupplierCreateDTO } from './../../../interfaces/supplierInterface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { locationDB, phoneCountryCodes } from '../../../data/locationDatabase';

import { ModalMessageInterface } from '../../../interfaces/modalInterface';
import { SmallCrudInterface } from '../../../interfaces/smallCrudsInterfaces';
import { supplierInterface } from '../../../interfaces/supplierInterface';

import { ModalService } from '../../../services/modal.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { suppliersService } from '../../../services/suppliers.service';
import { LocationResponseDTO } from '../../../interfaces/locationInterface';
import { LocationService } from '../../../services/location.service';
import { FiscalConditionService } from '../../../services/fiscal-condition.service';

@Component({
  selector: 'suppliers-new',
  templateUrl: './suppliers-new.component.html',
  styleUrl: './suppliers-new.component.css',
})
export class suppliersNewComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private smallCrudsService: SmallCrudsService,
    private supplierService: suppliersService,
    private locationService: LocationService,
    private fiscalService: FiscalConditionService,
    private titleService: Title
  ) {}

  currentSupplierId!: number;
  currentsupplier: SupplierCreateDTO = {
    brand: '',
    sectorId: -1,
    web: '',
    phone: { country: 54, number: '' },
    fullAddress: {
      address: '',
      addressNumber: undefined,
      provinceId: -1,
      city: 'Córdoba',
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
  selectedCountry: number = -1;
  countryCodes = phoneCountryCodes;
  sectors: SmallCrudInterface[] = [];
  fiscalConditions: SmallCrudInterface[] = [];
  cuitList: string[] = [];
  locationOptions: LocationResponseDTO[] = [];
  cuitExistFlag: boolean = false;
  flagNewsupplierCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;
  isCreatingSector: boolean = false;

  ngOnInit(): void {
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
      if (id !== null && !isNaN(Number(id))) {
        this.currentSupplierId = Number(id);
        this.supplierService
          .getElementForUpdate(parseInt(id))
          .subscribe((response) => {
            this.locationService
              .getCountryId(response.fullAddress.provinceId)
              .subscribe((countryId) => (this.selectedCountry = countryId));
            this.currentsupplier = response;
            this.titleService.setTitle(`Editar ${response.brand}`);
          });
        this.isUpdating = true;
      } else {
        this.supplierService.getList().subscribe((response) => {
          for (let supplier of response) {
            this.cuitList.push(supplier.cuit);
          }
        });
      }
    });
  }

  savesupplier(): void {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.issupplierInvalid).forEach((key) => {
      if (isFormValid && this.issupplierInvalid[key]) {
        this.modalMessageObject = {
          message: `Hay errores en el formulario.`,
          confirm: 'Continuar editando',
        };
        this.modalMessageFlag = true;
        isFormValid = false;
      }
    });
    if (isFormValid) {
      if (this.isUpdating) {
        this.supplierService
          .updateElement(this.currentSupplierId, this.currentsupplier)
          .subscribe();
      } else {
        this.supplierService.addElement(this.currentsupplier).subscribe();
      }
      console.log(this.currentsupplier);
      this.flagNewsupplierCreated = true;
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
    let subsciption = this.modalService.confirm$.subscribe((response) => {
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

  validateMail(mail: string): boolean {
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
    for (let compareCuit of this.cuitList) {
      if (cuit == compareCuit) {
        this.cuitExistFlag = true;
        return false;
      }
    }
    return !/[^0-9]/.test(cuit);
  }

  validatePhoneNumber(number: string | undefined): boolean {
    return (
      number !== undefined &&
      /^[1-9][0-9]*$/.test(number) &&
      number.length > 9 &&
      number.length < 14
    );
  }
  validateSubmite() {
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
}
