import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber } from '../interfaces/suplierInterface';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: PhoneNumber): string {
    let cad = '+' + value.country.toString() + '-' + value.number?.toString();
    return cad;
  }
}
