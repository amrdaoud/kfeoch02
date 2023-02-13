import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMessagesNavComponent } from './admin-messages-nav/admin-messages-nav.component';
import { GuestMessagesComponent } from './guest-messages/guest-messages.component';

const routes: Routes = [
  {path: '', component:AdminMessagesNavComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'guest-messages'},
    {path: 'guest-messages', component: GuestMessagesComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMessagesRoutingModule { }
