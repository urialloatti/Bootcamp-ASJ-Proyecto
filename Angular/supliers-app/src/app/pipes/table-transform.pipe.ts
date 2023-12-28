import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeExtra } from '../interfaces/listTemplateInterface';
import { CuitPipePipe } from './cuit-pipe.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { Contact, PhoneNumber } from '../interfaces/suplierInterface';
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
    private jsonPipe: JsonPipe,
    private contactPhone: ShowContactPhonePipe,
    private contactPipe: ShowContactPipe,
    private cuitPipe: CuitPipePipe,
    private mail: ShowMailPipe,
    private phone: PhoneNumberPipe
  ) {}

  transform(value: unknown, extra?: PipeExtra): any {
    if (extra) {
      switch (extra) {
        case 'Date':
          return this.datePipe.transform(value as Date, 'dd/MM/YYYY');
        case 'Currency':
          return this.currencyPipe.transform(value as string, 'USD');
        case 'CUIT':
          return this.cuitPipe.transform(value as string);
        case 'phone':
          return this.phone.transform(value as PhoneNumber);
        case 'contactName':
          return this.contactPipe.transform(value as Contact);
        case 'contactMails':
          return this.mail.transform(value as Contact);
        case 'contactPhone':
          return this.contactPhone.transform(value as Contact);
        case 'PurchaseOrder':
          return value ? '(Pendiente)' : '(Cancelado)';
        case 'FullDate':
          return this.datePipe.transform(value as Date, 'dd/MM/YYYY - hh:mm a');
      }
    }
    return value;
  }
}
