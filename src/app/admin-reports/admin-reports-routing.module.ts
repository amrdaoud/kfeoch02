import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportsNavComponent } from './admin-reports-nav/admin-reports-nav.component';
import { MainReportsComponent } from './main-reports/main-reports.component';

const routes: Routes = [
  {path:'', component: AdminReportsNavComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'main'},
    {path: 'main', component: MainReportsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportsRoutingModule { }
