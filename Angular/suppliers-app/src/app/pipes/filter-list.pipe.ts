import { TableTransformPipe } from './table-transform.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { keyValue } from '../interfaces/listTemplateInterface';

@Pipe({
  name: 'filterList',
})
export class FilterListPipe implements PipeTransform {
  constructor(private tablePipe: TableTransformPipe) {}

  transform(list: any[], arg: string, keys?: keyValue[]): any[] {
    if (keys === undefined || keys.length == 0) {
      return list;
    }
    if (list.length > 0) {
      let filtered = [];
      for (let value of list) {
        for (let key of keys) {
          if (
            this.tablePipe
              .transform(value[key.key], key.extras)
              .toLowerCase()
              .includes(arg.toLowerCase())
          ) {
            filtered.push(value);
          }
        }
      }
      return filtered;
    }
    return list;
  }
}
