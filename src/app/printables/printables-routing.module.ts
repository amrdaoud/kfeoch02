import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'payments/:id', component: PaymentComponent},
  {path:'certificates/:id', component: CertificateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintablesRoutingModule { }
