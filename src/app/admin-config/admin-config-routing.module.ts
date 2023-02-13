import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { AdminConfigNavComponent } from './admin-config-nav/admin-config-nav.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  {path: '', component: AdminConfigNavComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'users'},
    {path: 'users', component: UserListComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator']}},
    {path: 'users/:id', component: UserManagerComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator']}},
    {path: 'add-user', component: UserAddComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator']}},
    {path: 'security', component: PasswordChangeComponent,
    canActivate: [AuthGuard], data: {Roles: ['DictionaryManager', 'ReportManager', 'BillingManager', 'Administrator', 'Manager', 'SiteManager', 'OfficeManager']}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminConfigRoutingModule { }
