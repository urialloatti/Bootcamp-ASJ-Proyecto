import { Component, OnInit } from '@angular/core';
import { SupliersService } from '../../../services/supliers-service/supliers.service';
import { IVAOptions, SuplierInterface } from '../../../interfaces/suplierInterface';
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'supliers-new',
  templateUrl: './supliers-new.component.html',
  styleUrl: './supliers-new.component.css'
})
export class SupliersNewComponent {
  flagNewSuplierCreated: boolean = false;
  newSuplier!: SuplierInterface;

  constructor(private sService: SupliersService) { }

  brand = "";
  category = "";
  web = "";
  address = "";
  addressNumber = 0;
  state = "";
  country = "";
  cuit = 0;
  iva: IVAOptions = "Otro";
  name = "";
  surname = "";
  phone = 0;
  mail = "";
  rol = "";

  saveNewSuplier(): void {
    this.sService.addElement(this.newSuplier);
    this.flagNewSuplierCreated = true;
  }

  validateSubmit(): boolean {
    return this.validateString(this.brand) && this.validateString(this.category) && this.validateString(this.web) && this.validateString(this.address) && this.validateNumber(this.addressNumber) && this.validateString(this.state) && this.validateString(this.country) && this.validateNumber(this.cuit) && this.validateString(this.name) && this.validateString(this.surname) && this.validateNumber(this.phone) && this.validateMail(this.mail) && this.validateString(this.rol);
  }

  validateString(value: string): boolean {
    return (value.length > 0 && value.length < 80);
  }

  validateCuit(value: number): boolean {
    let cad = value.toString;
    return (cad.length == 11);
  }

  validateMail(value: string): boolean {
    return this.validateString(value) && value.includes("@");
  }

  validateNumber(value: number): boolean {
    let cad = value.toString
    return value < 0 && cad.length < 15;
  }

}
