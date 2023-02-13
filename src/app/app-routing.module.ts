import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app-guards/auth.guard';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: NavBarComponent,
  children: [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
    {path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule)},
    {path: 'site-offices', loadChildren: () => import('./site-office/site-office.module').then(m => m.SiteOfficeModule)},
  ]},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'office', loadChildren: () => import('./office/office.module').then(m => m.OfficeModule), canActivate: [AuthGuard], data: {Roles: ['Office','Administrator','OfficeManager']}},
  {path: 'kfeoch-admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: {Roles: ['DictionaryManager', 'ReportManager', 'BillingManager', 'Administrator', 'Manager', 'SiteManager', 'OfficeManager']}},
  {path: 'printables', loadChildren: () => import('./printables/printables.module').then(m => m.PrintablesModule)},
  {path: 'redirects', loadChildren: () => import('./redirects/redirects.module').then(m => m.RedirectsModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
