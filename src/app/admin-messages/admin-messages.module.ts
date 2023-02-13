import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagesRoutingModule } from './admin-messages-routing.module';
import { GuestMessagesComponent } from './guest-messages/guest-messages.component';
import { DataTableModule } from '../data-table/data-table.module';
import { AdminMessagesNavComponent } from './admin-messages-nav/admin-messages-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GuestMessagesComponent,
    AdminMessagesNavComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    AdminMessagesRoutingModule,
    SharedModule,
    TranslateModule,
    DataTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AdminMessagesModule { }
