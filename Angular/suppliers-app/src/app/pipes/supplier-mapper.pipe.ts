import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supplierMapper'
})
export class SupplierMapperPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
