import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchaseState',
})
export class PurchaseStatePipe implements PipeTransform {
  transform(value: boolean | undefined): string {
    return !value ? 'Cancelado' : 'Pendiente';
  }
}
