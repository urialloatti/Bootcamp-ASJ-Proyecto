import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeExtra } from '../interfaces/listTemplateInterface';
import { CuitPipePipe } from './cuit-pipe.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { Contact, PhoneNumber } from '../interfaces/supplierInterface';
import { ShowContactPipe } from './show-contact.pipe';
import { ShowMailPipe } from './show-mail.pipe';
import { ShowContactPhonePipe } from './show-contact-phone.pipe';

@Pipe({
  name: 'tableTransform',
})
export class TableTransformPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private contactPhone: ShowContactPhonePipe,
    private contactPipe: ShowContactPipe,
    private cuitPipe: CuitPipePipe,
    private mail: ShowMailPipe,
    private phone: PhoneNumberPipe
  ) {}

  transform(value: unknown, extra?: PipeExtra): any {
    if (extra) {
      switch (extra) {
        case 'contactMails':
          return this.mail.transform(value as Contact);
        case 'contactName':
          return this.contactPipe.transform(value as Contact);
        case 'contactPhone':
          return this.contactPhone.transform(value as Contact);
        case 'CUIT':
          return this.cuitPipe.transform(value as string);
        case 'Currency':
          return this.currencyPipe.transform(value as string, 'USD');
        case 'Date':
          return this.datePipe.transform(value as Date, 'YYYY/MM/dd');
        case 'FullDate':
          return this.datePipe.transform(value as Date, 'YYYY/MM/dd - hh:mm a');
        case 'phone':
          return this.phone.transform(value as PhoneNumber);
        case 'PurchaseOrder':
          return value ? '(Pendiente)' : '(Cancelado)';
      }
    }
    return value;
  }
}
