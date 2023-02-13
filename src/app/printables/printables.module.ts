import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintablesRoutingModule } from './printables-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { CertificateComponent } from './certificate/certificate.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QrCodeModule } from 'ng-qrcode';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PaymentComponent,
    CertificateComponent
  ],
  imports: [
    CommonModule,
    PrintablesRoutingModule,
    SharedModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    QrCodeModule
  ]
})
export class PrintablesModule { }
