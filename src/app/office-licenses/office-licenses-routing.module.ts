import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseFormAddComponent } from './license-form-add/license-form-add.component';
import { LicenseFormEditComponent } from './license-form-edit/license-form-edit.component';
import { LicenseListComponent } from './license-list/license-list.component';
import { MembershipInfoComponent } from './membership-info/membership-info.component';
import { OfficeLicensesNavComponent } from './office-licenses-nav/office-licenses-nav.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';


const routes: Routes = [{path: '',component: OfficeLicensesNavComponent, children:[
  {path: '',pathMatch:'full', redirectTo:'list'},
  {path: 'list', component: LicenseListComponent},
  {path: 'add', component: LicenseFormAddComponent},
  {path: 'edit/:id', component: LicenseFormEditComponent},
  {path: 'membership', component: MembershipInfoComponent},
  {path: 'payments', component: PaymentsListComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeLicensesRoutingModule { }
