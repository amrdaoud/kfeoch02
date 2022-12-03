import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { OfficeMemberListComponent } from './office-member-list/office-member-list.component';
import { OfficeMembersNavComponent } from './office-members-nav/office-members-nav.component';

const routes: Routes = [
  {path: '',component: OfficeMembersNavComponent, children:[
    {path: '',pathMatch:'full', redirectTo:'list'},
    {path: 'list', component: OfficeMemberListComponent},
    {path: 'new', component: MemberFormComponent},
    {path: 'edit/:id', component: MemberFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeMembersRoutingModule { }
