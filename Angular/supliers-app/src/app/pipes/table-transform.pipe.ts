import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeExtra } from '../interfaces/listTemplateInterface';
import { CuitPipePipe } from './cuit-pipe.pipe';

@Pipe({
  name: 'tableTransform'
})
export class TableTransformPipe implements PipeTransform {

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe, private cuitPipe: CuitPipePipe) { }

  transform(value: unknown, extra?: PipeExtra): string {
    let result: string | null = "";
    if (extra) {
      switch (extra) {
        case "Date":
          result = this.datePipe.transform(value as Date, "dd/MM/YYYY - hh:mm a");
          break;
        case "Currency":
          result = this.currencyPipe.transform(value as string, "USD")
          break;
        case "CUIT":
          result = this.cuitPipe.transform(value as string);
      }
    }
    return result || value as string
  }
}
