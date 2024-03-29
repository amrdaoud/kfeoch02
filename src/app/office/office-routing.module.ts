import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { ActivitiesComponent } from './activities/activities.component';
import { OfficeHomeComponent } from './office-home/office-home.component';
import { OfficeInformationComponent } from './office-information/office-information.component';
import { OfficeNavComponent } from './office-nav/office-nav.component';
import { OfficeSecurityComponent } from './office-security/office-security.component';
import { PhonesComponent } from './phones/phones.component';
import { SpecialtiesComponent } from './specialties/specialties.component';

const routes: Routes = [
  {path: '',component: OfficeNavComponent, children: [
    {path: '',pathMatch:'full', redirectTo:'home'},
    {path: 'home', component: OfficeHomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'information'},
      {path: 'information', component: OfficeInformationComponent},
      {path: 'specialties', component: SpecialtiesComponent},
      {path: 'activities', component: ActivitiesComponent},
      {path: 'phones', component: PhonesComponent},
      {path: 'security', component: OfficeSecurityComponent}
    ]},

    {path: 'members', loadChildren: () =>import('../office-members/office-members.module').then(m => m.OfficeMembersModule)},
    {path: 'licenses', loadChildren: () => import('../office-licenses/office-licenses.module').then(m => m.OfficeLicensesModule)},
    {path: 'certificates', loadChildren: () => import('../office-certificates/office-certificates.module').then(m => m.OfficeCertificatesModule)},
  ]},

  {path: ':id',component: OfficeNavComponent, children: [
    {path: '',pathMatch:'full', redirectTo:'home'},
    {path: 'home', component: OfficeHomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'information'},
      {path: 'information', component: OfficeInformationComponent},
      {path: 'specialties', component: SpecialtiesComponent},
      {path: 'activities', component: ActivitiesComponent},
      {path: 'phones', component: PhonesComponent},
      {path: 'security', component: OfficeSecurityComponent}
    ]},

    {path: 'members', loadChildren: () =>import('../office-members/office-members.module').then(m => m.OfficeMembersModule)},
    {path: 'licenses', loadChildren: () => import('../office-licenses/office-licenses.module').then(m => m.OfficeLicensesModule)},
    {path: 'certificates', loadChildren: () => import('../office-certificates/office-certificates.module').then(m => m.OfficeCertificatesModule)},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
