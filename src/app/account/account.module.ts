import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { OfficeLoginComponent } from './office-login/office-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { OfficeRegisterComponent } from './office-register/office-register.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import LanguageService from '../app-services/language.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    OfficeLoginComponent,
    OfficeRegisterComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    MatDividerModule,
    TranslateModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class AccountModule { }
