import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
})
export class LocaleDatePipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): string {
    const date = new Date(value.toString().replace('Z',''));
    const result = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset())).toLocaleString();
    return result;
  }
}
