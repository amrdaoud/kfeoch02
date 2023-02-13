import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationAddComponent } from './information-add/information-add.component';
import { MembershipAddComponent } from './membership-add/membership-add.component';
import { OfficeCertificatesNavComponent } from './office-certificates-nav/office-certificates-nav.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [{path: '',component: OfficeCertificatesNavComponent, children:[
  {path: '',pathMatch:'full', redirectTo:'list'},
  {path: 'list', component: RequestListComponent},
  {path: 'membership', component: MembershipAddComponent},
  {path: 'information-update', component: InformationAddComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeCertificatesRoutingModule { }
