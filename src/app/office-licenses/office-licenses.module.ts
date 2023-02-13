import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { OfficeLicensesRoutingModule } from './office-licenses-routing.module';
import { LicenseListComponent } from './license-list/license-list.component';
import { DataTableModule } from '../data-table/data-table.module';
import { OfficeLicensesNavComponent } from './office-licenses-nav/office-licenses-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { LicenseFormAddComponent } from './license-form-add/license-form-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { LicenseFormEditComponent } from './license-form-edit/license-form-edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MembershipInfoComponent } from './membership-info/membership-info.component';
import { LocalizedDatePipe } from '../app-helpers/localized-date.pipe';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { LocalizedCurrencyPipe } from '../app-helpers/localized-currency.pipe';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';


@NgModule({
  declarations: [
    LicenseListComponent,
    OfficeLicensesNavComponent,
    LicenseFormAddComponent,
    LicenseFormEditComponent,
    MembershipInfoComponent,
    PaymentsListComponent
  ],
  imports: [
    CommonModule,
    OfficeLicensesRoutingModule,
    DataTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    ReactiveFormsModule,
    MatGridListModule,
    SharedModule,
    SharedFormControlsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LocalizedDatePipe,
    LocalizedCurrencyPipe
  ]
})
export class OfficeLicensesModule { }
