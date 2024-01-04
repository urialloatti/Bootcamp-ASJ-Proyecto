import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SupliersService } from '../../../services/supliers.service';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { locationDB, phoneCountryCodes } from '../../../data/locationDatabase';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'supliers-new',
  templateUrl: './supliers-new.component.html',
  styleUrl: './supliers-new.component.css',
})
export class SupliersNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private suplierService: SupliersService,
    private titleService: Title
  ) {}

  currentSuplier: SuplierInterface = {
    brand: '',
    category: '',
    web: '',
    phone: { country: 54, number: undefined },
    fullAddress: {
      address: '',
      addressNumber: undefined,
      country: 'Argentina',
      district: '',
      state: 'Córdoba',
      zipCode: '',
    },
    cuit: '',
    iva: 'Otro',
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
    category: false,
    phone: false,
    web: false,
    fullAddresAddress: false,
    fullAddresAddressNumber: false,
    fullAddresDistrict: false,
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
  cuitList: string[] = [];
  locationOptions = locationDB;
  cuitExistFlag: boolean = false;
  flagNewSuplierCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;

  ngOnInit(): void {
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
        this.currentSuplier.isAvailable = true;
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
    this.currentSuplier.brand.length < 4 ||
    this.currentSuplier.brand.length > 60
      ? (this.isSuplierInvalid.brand = true)
      : (this.isSuplierInvalid.brand = false);
    this.currentSuplier.category.length < 4 ||
    this.currentSuplier.category.length > 60
      ? (this.isSuplierInvalid.category = true)
      : (this.isSuplierInvalid.category = false);
    !this.currentSuplier.contact.phone?.number ||
    this.currentSuplier.contact.phone.number < 0
      ? (this.isSuplierInvalid.phone = true)
      : (this.isSuplierInvalid.phone = false);
    this.currentSuplier.web.length < 4 || this.currentSuplier.web.length > 60
      ? (this.isSuplierInvalid.web = true)
      : (this.isSuplierInvalid.web = false);
    this.currentSuplier.fullAddress.address.length < 4 ||
    this.currentSuplier.fullAddress.address.length > 60
      ? (this.isSuplierInvalid.fullAddressAddress = true)
      : (this.isSuplierInvalid.fullAddressAddress = false);
    !this.currentSuplier.fullAddress.addressNumber ||
    this.currentSuplier.fullAddress.addressNumber < 0
      ? (this.isSuplierInvalid.fullAddressAddressNumber = true)
      : (this.isSuplierInvalid.fullAddressAddressNumber = false);
    this.currentSuplier.fullAddress.district.length < 4 ||
    this.currentSuplier.fullAddress.district.length > 60
      ? (this.isSuplierInvalid.fullAddressDistrict = true)
      : (this.isSuplierInvalid.fullAddressDistrict = false);
    this.currentSuplier.fullAddress.zipCode.length < 3 ||
    this.currentSuplier.fullAddress.zipCode.length > 6
      ? (this.isSuplierInvalid.fullAddressZIP = true)
      : (this.isSuplierInvalid.fullAddressZIP = false);
    !this.validateCuit(this.currentSuplier.cuit) ||
    this.currentSuplier.cuit.length < 10 ||
    this.currentSuplier.cuit.length > 13
      ? (this.isSuplierInvalid.cuit = true)
      : (this.isSuplierInvalid.cuit = false);
    this.currentSuplier.iva === 'Otro'
      ? (this.isSuplierInvalid.iva = true)
      : (this.isSuplierInvalid.iva = false);
    this.currentSuplier.contact.name.length < 4 ||
    this.currentSuplier.contact.name.length > 30
      ? (this.isSuplierInvalid.contactName = true)
      : (this.isSuplierInvalid.contactName = false);
    this.currentSuplier.contact.surname.length < 4 ||
    this.currentSuplier.contact.surname.length > 30
      ? (this.isSuplierInvalid.contactSurname = true)
      : (this.isSuplierInvalid.contactSurname = false);
    !this.currentSuplier.contact.phone?.number ||
    this.currentSuplier.contact.phone.number < 0
      ? (this.isSuplierInvalid.contactPhone = true)
      : (this.isSuplierInvalid.contactPhone = false);
    this.currentSuplier.contact.mail.length < 4 ||
    this.currentSuplier.contact.mail.length > 40 ||
    !this.validateMail(this.currentSuplier.contact.mail)
      ? (this.isSuplierInvalid.contactMail = true)
      : (this.isSuplierInvalid.contactMail = false);
    this.currentSuplier.contact.rol.length < 4 ||
    this.currentSuplier.contact.rol.length > 40
      ? (this.isSuplierInvalid.contactRol = true)
      : (this.isSuplierInvalid.contactRol = false);
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
