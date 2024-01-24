import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/supplierInterface';

@Pipe({
  name: 'showMail',
})
export class ShowMailPipe implements PipeTransform {
  transform(value: Contact): string {
    return value.mail;
  }
}
