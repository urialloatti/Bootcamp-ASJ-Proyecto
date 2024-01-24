import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/supplierInterface';
import { PhoneNumberPipe } from './phone-number.pipe';

@Pipe({
  name: 'showContactPhone',
})
export class ShowContactPhonePipe implements PipeTransform {
  constructor(private phonePipe: PhoneNumberPipe) {}

  transform(value: Contact): string {
    return this.phonePipe.transform(value.phone);
  }
}
