import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteOfficeRoutingModule } from './site-office-routing.module';
import { OfficesSearchComponent } from './offices-search/offices-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OfficeGuestComponent } from './office-guest/office-guest.component';


@NgModule({
  declarations: [
    OfficesSearchComponent,
    OfficeGuestComponent
  ],
  imports: [
    CommonModule,
    SiteOfficeRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class SiteOfficeModule { }
