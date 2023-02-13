import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminReportsNavComponent } from './admin-reports-nav/admin-reports-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MainReportsComponent } from './main-reports/main-reports.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AdminReportsNavComponent,
    MainReportsComponent
  ],
  imports: [
    CommonModule,
    AdminReportsRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class AdminReportsModule { }
