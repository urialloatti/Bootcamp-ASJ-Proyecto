import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuitPipe',
})
export class CuitPipePipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace(/\D/g, '');
    if (value.length > 2 && value.length < 11) {
      return (value as string).replace(/^(\d{2})/, '$1-');
    }
    return (value as string).replace(/^(\d{2})(\d{8})(\d)/, `$1-$2-$3`);
  }
}
