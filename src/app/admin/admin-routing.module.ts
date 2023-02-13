import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { AdminDictionariesNavComponent } from './admin-dictionaries-nav/admin-dictionaries-nav.component';
import { AdminDictionaryComponent } from './admin-dictionary/admin-dictionary.component';
import { AdminLicenseNavComponent } from './admin-license-nav/admin-license-nav.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminPendingLicenseFormComponent } from './admin-pending-license-form/admin-pending-license-form.component';
import { AdminPendingLicensesComponent } from './admin-pending-licenses/admin-pending-licenses.component';

const routes: Routes = [
  {path: '', component: AdminNavComponent, children: [
    //{path: '', pathMatch:'full', redirectTo: 'offices'},
    {path: 'dictionaries', component: AdminDictionariesNavComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator','DictionaryManager']},
      children:[
        {path: '', pathMatch: 'full', redirectTo: 'office-types'},
        { path: 'office-types', component: AdminDictionaryComponent},
        { path: 'office-specialities', component: AdminDictionaryComponent},
        { path: 'office-activities', component: AdminDictionaryComponent},
        { path: 'office-entities', component: AdminDictionaryComponent},
        { path: 'office-legal-entities', component: AdminDictionaryComponent},
        { path: 'contact-types', component: AdminDictionaryComponent},
        { path: 'office-owner-specialities', component: AdminDictionaryComponent},
        { path: 'office-owner-positions', component: AdminDictionaryComponent},
        { path: 'countries', component: AdminDictionaryComponent},
        { path: 'governorates', component: AdminDictionaryComponent},
        { path: 'areas', component: AdminDictionaryComponent},
        { path: 'office-document-types', component: AdminDictionaryComponent},
        { path: 'owner-document-types', component: AdminDictionaryComponent},
        { path: 'post-categories', component: AdminDictionaryComponent},
        { path: 'certificate-entities', component: AdminDictionaryComponent},
        { path: 'request-types', component: AdminDictionaryComponent},
    ]},
    {path: 'licenses', component: AdminLicenseNavComponent,
    canActivate: [AuthGuard], data: {Roles: ['Administrator','OfficeManager']},
    children:[
      {path: '', pathMatch:'full', redirectTo: 'pending-licenses'},
      {path:'pending-licenses', component: AdminPendingLicensesComponent},
      {path: 'pending-licenses/:id', component: AdminPendingLicenseFormComponent}
    ]},
    {path: 'offices', loadChildren: () => import('../admin-offices/admin-offices.module').then(m => m.AdminOfficesModule),
    canActivate: [AuthGuard], data: {Roles: ['Administrator','OfficeManager', 'BillingManager']},},
    {path: 'site-content', loadChildren: () => import('../admin-site-content/admin-site-content.module').then(m => m.AdminSiteContentModule),
    canActivate: [AuthGuard], data: {Roles: ['Administrator','SiteManager']},},
    {path: 'messages', loadChildren: () => import('../admin-messages/admin-messages.module').then(m => m.AdminMessagesModule),
    canActivate: [AuthGuard], data: {Roles: ['Administrator','SiteManager']},},
    {path: 'reports', loadChildren: () => import('../admin-reports/admin-reports.module').then(m => m.AdminReportsModule),
    canActivate: [AuthGuard], data: {Roles: ['Administrator','ReportManager']},},
    {path: 'config', loadChildren: () => import('../admin-config/admin-config.module').then(m => m.AdminConfigModule),
    canActivate: [AuthGuard], data: {Roles: ['UserManager','DictionaryManager', 'ReportManager', 'BillingManager', 'Administrator', 'Manager', 'SiteManager', 'OfficeManager']},
  },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
