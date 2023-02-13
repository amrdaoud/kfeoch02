import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NewsCardComponent } from './news-card/news-card.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { MatTooltipModule } from '@angular/material/tooltip';

import { LocaleDatePipe } from '../app-helpers/locale-date.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

import { LocalizedDatePipe } from '../app-helpers/localized-date.pipe';
import { LocalizedCurrencyPipe } from '../app-helpers/localized-currency.pipe';
import { SafeHtmlPipe } from '../app-helpers/safe-html.pipe';
import { SelectorCardComponent } from '../home/selector-card/selector-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    NewsCardComponent,
    LocaleDatePipe,
    LocalizedDatePipe,
    LocalizedCurrencyPipe,
    ConfirmComponent,
    SafeHtmlPipe,
    SelectorCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    TranslateModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
            NewsCardComponent,
            LocaleDatePipe,
            LocalizedDatePipe,
            LocalizedCurrencyPipe,
            SafeHtmlPipe,
            SelectorCardComponent]
})
export class SharedModule { }
