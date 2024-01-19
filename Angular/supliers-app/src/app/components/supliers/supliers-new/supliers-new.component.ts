import { SectorService } from './../../../services/sector.service';
import { SectorInterface } from './../../../interfaces/smallCrudsInterfaces';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SupliersService } from '../../../services/supliers.service';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { locationDB, phoneCountryCodes } from '../../../data/locationDatabase';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'supliers-new',
  templateUrl: './supliers-new.component.html',
  styleUrl: './supliers-new.component.css',
})
export class SupliersNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private suplierService: SupliersService,
    private sectorService: SectorService,
    private titleService: Title,
    private modalService: ModalService
  ) {}

  currentSuplier: SuplierInterface = {
    brand: '',
    sector: 'Otro',
    web: '',
    phone: { country: 54, number: undefined },
    fullAddress: {
      address: '',
      addressNumber: undefined,
      country: 'Argentina',
      province: '',
      city: 'Córdoba',
      zipCode: '',
    },
    cuit: '',
    fiscal_condition: 'Otro',
    contact: {
      mail: '',
      name: '',
      phone: { country: 54, number: undefined },
      rol: '',
      surname: '',
    },
  };
  isSuplierInvalid: any = {
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
  countryCodes = phoneCountryCodes;
  sectors: SectorInterface[] = [];
  cuitList: string[] = [];
  locationOptions = locationDB;
  cuitExistFlag: boolean = false;
  flagNewSuplierCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;
  isCreatingSector: boolean = false;

  ngOnInit(): void {
    this.suplierService.updateCounter();
    this.sectorService
      .getList()
      .subscribe((secList) => (this.sectors = secList));
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.suplierService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentSuplier = response;
            this.titleService.setTitle(`Editar ${response.brand}`);
          });
        this.isUpdating = true;
      } else {
        this.suplierService.getList().subscribe((response) => {
          for (let suplier of response) {
            this.cuitList.push(suplier.cuit);
          }
        });
      }
    });
  }

  saveSuplier(): void {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.isSuplierInvalid).forEach((key) => {
      if (isFormValid && this.isSuplierInvalid[key]) {
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
        this.suplierService.updateElement(this.currentSuplier).subscribe();
      } else {
        this.suplierService.addElement(this.currentSuplier).subscribe();
      }
      console.log(this.currentSuplier);
      this.flagNewSuplierCreated = true;
    }
  }

  getProvinces(country: string): string[] {
    return (
      this.locationOptions.find((location) => location.country == country)
        ?.provinces || []
    );
  }

  createNewSector() {
    this.isCreatingSector = true;
    let subsciption = this.modalService.confirm$.subscribe((response) => {
      this.sectorService
        .getList()
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

  validateSubmite() {
    this.isSuplierInvalid.brand =
      this.currentSuplier.brand.length < 4 ||
      this.currentSuplier.brand.length > 60;
    this.isSuplierInvalid.sector = this.currentSuplier.sector == 'Otro';
    this.isSuplierInvalid.phone =
      !this.currentSuplier.contact.phone?.number ||
      this.currentSuplier.contact.phone.number < 0;
    this.isSuplierInvalid.web =
      this.currentSuplier.web.length < 4 || this.currentSuplier.web.length > 60;
    this.isSuplierInvalid.fullAddressAddress =
      this.currentSuplier.fullAddress.address.length < 4 ||
      this.currentSuplier.fullAddress.address.length > 60;
    this.isSuplierInvalid.fullAddressAddressNumber =
      !this.currentSuplier.fullAddress.addressNumber ||
      this.currentSuplier.fullAddress.addressNumber < 0;
    this.isSuplierInvalid.fullAddressCity =
      this.currentSuplier.fullAddress.city.length < 4 ||
      this.currentSuplier.fullAddress.city.length > 60;
    this.isSuplierInvalid.fullAddressZIP =
      this.currentSuplier.fullAddress.zipCode.length < 3 ||
      this.currentSuplier.fullAddress.zipCode.length > 6;
    this.isSuplierInvalid.cuit =
      !this.validateCuit(this.currentSuplier.cuit) ||
      this.currentSuplier.cuit.length < 10 ||
      this.currentSuplier.cuit.length > 13;
    this.isSuplierInvalid.iva = this.currentSuplier.fiscal_condition === 'Otro';
    this.isSuplierInvalid.contactName =
      this.currentSuplier.contact.name.length < 4 ||
      this.currentSuplier.contact.name.length > 30;
    this.isSuplierInvalid.contactSurname =
      this.currentSuplier.contact.surname.length < 4 ||
      this.currentSuplier.contact.surname.length > 30;
    this.isSuplierInvalid.contactPhone =
      !this.currentSuplier.contact.phone?.number ||
      this.currentSuplier.contact.phone.number < 0;
    this.isSuplierInvalid.contactMail =
      this.currentSuplier.contact.mail.length < 4 ||
      this.currentSuplier.contact.mail.length > 40 ||
      !this.validateMail(this.currentSuplier.contact.mail);
    this.isSuplierInvalid.contactRol =
      this.currentSuplier.contact.rol.length < 4 ||
      this.currentSuplier.contact.rol.length > 40;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
