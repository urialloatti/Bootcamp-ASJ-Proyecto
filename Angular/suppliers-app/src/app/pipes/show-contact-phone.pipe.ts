import { Pipe, PipeTransform } from '@angular/core';
import { ContactResponseDTO } from '../interfaces/supplierInterface';
import { PhoneNumberPipe } from './phone-number.pipe';

@Pipe({
  name: 'showContactPhone',
})
export class ShowContactPhonePipe implements PipeTransform {
  constructor(private phonePipe: PhoneNumberPipe) {}

  transform(value: ContactResponseDTO): string {
    return this.phonePipe.transform(value.phone);
  }
}
