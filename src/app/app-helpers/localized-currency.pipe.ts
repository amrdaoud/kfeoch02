import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedCurrency',
  pure: false
})
export class LocalizedCurrencyPipe implements PipeTransform {
  constructor(private translateService: TranslateService){}
  transform(value: any, ...args: unknown[]): unknown {
    const currencyPipe = new CurrencyPipe(this.translateService.currentLang);
    return currencyPipe.transform(value,'KWD');
  }

}
