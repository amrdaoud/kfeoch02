import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { OfficeLoginComponent } from './office-login/office-login.component';
import { OfficeRegisterComponent } from './office-register/office-register.component';

const routes: Routes = [
  {path: '',pathMatch: 'prefix', redirectTo: 'login'},
  {path: 'login', component: OfficeLoginComponent},
  {path: 'register', component: OfficeRegisterComponent},
  {path: 'kfeoch-admin-login', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
