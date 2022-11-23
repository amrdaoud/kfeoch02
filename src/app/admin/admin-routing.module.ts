import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavComponent } from './admin-nav/admin-nav.component';

const routes: Routes = [
  {path: '', component: AdminNavComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
