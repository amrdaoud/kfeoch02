import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  {path: '', component: NavBarComponent,
  children: [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  ]},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'office', loadChildren: () => import('./office/office.module').then(m => m.OfficeModule)},
  {path: 'kfeoch-admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
