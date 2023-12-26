import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/suplierInterface';

@Pipe({
  name: 'showContact',
})
export class ShowContactPipe implements PipeTransform {
  transform(value: Contact): string {
    return `${value.surname} ${value.name}`;
  }
}
