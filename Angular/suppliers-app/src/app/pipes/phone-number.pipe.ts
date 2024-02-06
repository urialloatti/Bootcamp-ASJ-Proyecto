import { Pipe, PipeTransform } from '@angular/core';

import { PhoneNumber } from '../interfaces/supplierInterface';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: PhoneNumber): string {
    let cad = '+' + value.country.toString() + '-' + value.number;
    return cad;
  }
}
