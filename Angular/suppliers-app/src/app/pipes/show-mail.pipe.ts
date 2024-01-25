import { Pipe, PipeTransform } from '@angular/core';
import { ContactResponseDTO } from '../interfaces/supplierInterface';

@Pipe({
  name: 'showMail',
})
export class ShowMailPipe implements PipeTransform {
  transform(value: ContactResponseDTO): string {
    return value.mail;
  }
}
