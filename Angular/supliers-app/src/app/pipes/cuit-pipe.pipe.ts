import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuitPipe'
})
export class CuitPipePipe implements PipeTransform {

  transform(value: string): string {
    return (value as string).replace(/^(\d{2})(\d{8})(\d)/, `$1-$2-$3`);
  }

}
