import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeHomeComponent } from './office-home/office-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OfficeNavComponent } from './office-nav/office-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { OfficeInformationComponent } from './office-information/office-information.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpecialtiesComponent } from './specialties/specialties.component';
import { PhonesComponent } from './phones/phones.component';
import { ActivitiesComponent } from './activities/activities.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { OfficeSecurityComponent } from './office-security/office-security.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    OfficeHomeComponent,
    OfficeNavComponent,
    OfficeInformationComponent,
    SpecialtiesComponent,
    PhonesComponent,
    ActivitiesComponent,
    OfficeSecurityComponent
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    TranslateModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule
  ]
})
export class OfficeModule { }
