import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeGuestComponent } from './office-guest/office-guest.component';
import { OfficesSearchComponent } from './offices-search/offices-search.component';

const routes: Routes = [
  {path: '', component: OfficesSearchComponent},
  {path: ':id', component: OfficeGuestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteOfficeRoutingModule { }
