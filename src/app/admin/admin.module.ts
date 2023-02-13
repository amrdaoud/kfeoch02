import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminDictionariesNavComponent } from './admin-dictionaries-nav/admin-dictionaries-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { AdminDictionaryComponent } from './admin-dictionary/admin-dictionary.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminLicenseNavComponent } from './admin-license-nav/admin-license-nav.component';
import { AdminPendingLicensesComponent } from './admin-pending-licenses/admin-pending-licenses.component';
import { DataTableModule } from '../data-table/data-table.module';
import { LocaleDatePipe } from '../app-helpers/locale-date.pipe';
import { AdminPendingLicenseFormComponent } from './admin-pending-license-form/admin-pending-license-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocalizedDatePipe } from '../app-helpers/localized-date.pipe';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AdminNavComponent,
    AdminDictionariesNavComponent,
    AdminDictionaryComponent,
    AdminLicenseNavComponent,
    AdminPendingLicensesComponent,
    AdminPendingLicenseFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers:[
    LocalizedDatePipe
  ]
})
export class AdminModule { }
