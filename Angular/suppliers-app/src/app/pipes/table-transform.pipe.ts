import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { CuitPipePipe } from './cuit-pipe.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { PipeExtra } from '../interfaces/listTemplateInterface';
import { ShowContactPhonePipe } from './show-contact-phone.pipe';
import { ShowContactPipe } from './show-contact.pipe';
import { ShowCountryPipe } from './show-country.pipe';
import { ShowMailPipe } from './show-mail.pipe';
import { ShowProvincePipe } from './show-province.pipe';

import {
  AddressResponseDTO,
  Contact,
  PhoneNumber,
} from '../interfaces/supplierInterface';

@Pipe({
  name: 'tableTransform',
})
export class TableTransformPipe implements PipeTransform {
  constructor(
    private contactPhone: ShowContactPhonePipe,
    private contactPipe: ShowContactPipe,
    private country: ShowCountryPipe,
    private cuitPipe: CuitPipePipe,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private mail: ShowMailPipe,
    private phone: PhoneNumberPipe,
    private province: ShowProvincePipe
  ) {}

  transform(value: unknown, extra?: PipeExtra): string {
    if (extra) {
      switch (extra) {
        case 'contactMails':
          return this.mail.transform(value as Contact);
        case 'contactName':
          return this.contactPipe.transform(value as Contact);
        case 'contactPhone':
          return this.contactPhone.transform(value as Contact);
        case 'country':
          return this.country.transform(value as AddressResponseDTO);
        case 'CUIT':
          return this.cuitPipe.transform(value as string);
        case 'Currency':
          return this.currencyPipe.transform(value as string, 'USD')!;
        case 'Date':
          return this.datePipe.transform(value as Date, 'YYYY/MM/dd')!;
        case 'FullDate':
          return this.datePipe.transform(
            value as Date,
            'YYYY/MM/dd - hh:mm a'
          )!;
        case 'phone':
          return this.phone.transform(value as PhoneNumber);
        case 'province':
          return this.province.transform(value as AddressResponseDTO);
        case 'PurchaseOrder':
          return value ? '(Pendiente)' : '(Cancelado)';
      }
    }
    return String(value);
  }
}
