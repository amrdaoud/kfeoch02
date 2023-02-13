import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService){}
  transform(value: Date, format = 'mediumDate'): unknown {
    if(!value) {
      return '';
    }
    const date = new Date(value.toString().replace('Z',''));
    const gDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    const datePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(gDate, format);
  }

}
