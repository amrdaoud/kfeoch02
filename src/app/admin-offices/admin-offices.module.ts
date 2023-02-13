import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOfficesRoutingModule } from './admin-offices-routing.module';
import { OfficeListComponent } from './office-list/office-list.component';
import { AdminOfficesNavComponent } from './admin-offices-nav/admin-offices-nav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableModule } from '../data-table/data-table.module';
import { SharedModule } from '../shared/shared.module';
import { LocalizedDatePipe } from '../app-helpers/localized-date.pipe';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { LocalizedCurrencyPipe } from '../app-helpers/localized-currency.pipe';


@NgModule({
  declarations: [
    OfficeListComponent,
    AdminOfficesNavComponent,
    BillingInfoComponent
  ],
  imports: [
    CommonModule,
    AdminOfficesRoutingModule,
    TranslateModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    SharedModule,
    SharedFormControlsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatGridListModule,
    FormsModule,
    MatProgressSpinnerModule,
    DataTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    LocalizedDatePipe,
    LocalizedCurrencyPipe
  ]
})
export class AdminOfficesModule { }
