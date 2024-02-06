import { Pipe, PipeTransform } from '@angular/core';

import { AddressResponseDTO } from '../interfaces/supplierInterface';

@Pipe({
  name: 'showCountry',
})
export class ShowCountryPipe implements PipeTransform {
  transform(address: AddressResponseDTO): string {
    return address.country;
  }
}
