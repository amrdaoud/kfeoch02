import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { AdminOfficesNavComponent } from './admin-offices-nav/admin-offices-nav.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { OfficeListComponent } from './office-list/office-list.component';

const routes: Routes = [
  {path: '', component: AdminOfficesNavComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: OfficeListComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator', 'OfficeManager']}},
    {path: 'billing', component: BillingInfoComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator', 'BillingManager']}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOfficesRoutingModule { }
