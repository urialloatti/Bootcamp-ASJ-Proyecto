import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeExtra } from '../interfaces/listTemplateInterface';
import { CuitPipePipe } from './cuit-pipe.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { Contact, PhoneNumber } from '../interfaces/suplierInterface';
import { ShowContactPipe } from './show-contact.pipe';
import { ShowMailPipe } from './show-mail.pipe';
import { ShowContactPhonePipe } from './show-contact-phone.pipe';
import { PurchaseOrdersService } from '../services/purchase-orders.service';

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
    private phone: PhoneNumberPipe,
    private pOrderService: PurchaseOrdersService
  ) {}

  transform(value: unknown, extra?: PipeExtra): string {
    let result: string | null = '';
    if (extra) {
      switch (extra) {
        case 'Date':
          result = this.datePipe.transform(value as Date, 'dd/MM/YYYY');
          break;
        case 'Currency':
          result = this.currencyPipe.transform(value as string, 'USD');
          break;
        case 'CUIT':
          result = this.cuitPipe.transform(value as string);
          break;
        case 'phone':
          result = this.phone.transform(value as PhoneNumber);
          break;
        case 'contactName':
          result = this.contactPipe.transform(value as Contact);
          break;
        case 'contactMails':
          result = this.mail.transform(value as Contact);
          break;
        case 'contactPhone':
          result = this.contactPhone.transform(value as Contact);
          break;
        case 'PurchaseOrder':
          let pOrder = this.pOrderService.getElementById(value as number);
          if (pOrder!.isCanceled) {
            result = pOrder!.suplierName + ' (Cancelado)';
          } else {
            result = pOrder!.suplierName || '';
          }
          break;
        case 'FullDate':
          result = this.datePipe.transform(
            value as Date,
            'dd/MM/YYYY - hh:mm a'
          );
          break;
      }
    }
    return result || (value as string);
  }
}
