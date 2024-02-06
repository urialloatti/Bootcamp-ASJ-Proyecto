import { Pipe, PipeTransform } from '@angular/core';

import { ContactResponseDTO } from '../interfaces/supplierInterface';

@Pipe({
  name: 'showContact',
})
export class ShowContactPipe implements PipeTransform {
  transform(value: ContactResponseDTO): string {
    return `${value.surname} ${value.name}`;
  }
}
