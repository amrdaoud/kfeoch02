import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeCertificatesRoutingModule } from './office-certificates-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OfficeCertificatesNavComponent } from './office-certificates-nav/office-certificates-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizedCurrencyPipe } from '../app-helpers/localized-currency.pipe';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from '../data-table/data-table.module';
import { LocalizedDatePipe } from '../app-helpers/localized-date.pipe';
import { MembershipAddComponent } from './membership-add/membership-add.component';
import { InformationAddComponent } from './information-add/information-add.component';


@NgModule({
  declarations: [
    RequestListComponent,
    RequestAddComponent,
    OfficeCertificatesNavComponent,
    MembershipAddComponent,
    InformationAddComponent
  ],
  imports: [
    CommonModule,
    SharedFormControlsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    DataTableModule,
    OfficeCertificatesRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [
    LocalizedDatePipe,
    LocalizedCurrencyPipe
  ]
})
export class OfficeCertificatesModule { }
