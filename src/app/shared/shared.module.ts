import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCardComponent } from './selector-card/selector-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsCardComponent } from './news-card/news-card.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { LocaleDatePipe } from '../app-helpers/locale-date.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NameHolderComponent } from './name-holder/name-holder.component';

@NgModule({
  declarations: [
    SelectorCardComponent,
    NewsCardComponent,
    InputComponent,
    SelectComponent,
    LocaleDatePipe,
    ConfirmComponent,
    NameHolderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [SelectorCardComponent, NewsCardComponent, InputComponent, SelectComponent, LocaleDatePipe, NameHolderComponent]
})
export class SharedModule { }
