import { Pipe, PipeTransform } from '@angular/core';

import { AddressResponseDTO } from '../interfaces/supplierInterface';

@Pipe({
  name: 'showProvince',
})
export class ShowProvincePipe implements PipeTransform {
  transform(address: AddressResponseDTO): string {
    return address.province;
  }
}
