import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { OfficeHomeComponent } from './office-home/office-home.component';
import { OfficeInformationComponent } from './office-information/office-information.component';
import { OfficeNavComponent } from './office-nav/office-nav.component';
import { OwnersComponent } from './owners/owners.component';
import { PhonesComponent } from './phones/phones.component';
import { SpecialtiesComponent } from './specialties/specialties.component';

const routes: Routes = [
  {path: '',component: OfficeNavComponent, children: [
    {path: '',pathMatch:'full', redirectTo:'home'},
    {path: 'home', component: OfficeHomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'information'},
      {path: 'information', component: OfficeInformationComponent},
      {path: 'owners', component: OwnersComponent},
      {path: 'specialties', component: SpecialtiesComponent},
      {path: 'activities', component: ActivitiesComponent},
      {path: 'phones', component: PhonesComponent}
    ]}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
