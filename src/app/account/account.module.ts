import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { OfficeLoginComponent } from './office-login/office-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { OfficeRegisterComponent } from './office-register/office-register.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmailResendComponent } from './email-resend/email-resend.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { ForgetSendComponent } from './forget-send/forget-send.component';
import { ForgetReceiveComponent } from './forget-receive/forget-receive.component';

@NgModule({
  declarations: [
    OfficeLoginComponent,
    OfficeRegisterComponent,
    AdminLoginComponent,
    EmailResendComponent,
    TermsConditionComponent,
    ForgetSendComponent,
    ForgetReceiveComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedFormControlsModule,
    MatDividerModule,
    TranslateModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    SharedModule
  ]
})
export class AccountModule { }
