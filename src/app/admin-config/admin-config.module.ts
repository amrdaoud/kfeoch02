import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminConfigRoutingModule } from './admin-config-routing.module';
import { AdminConfigNavComponent } from './admin-config-nav/admin-config-nav.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTableModule } from '../data-table/data-table.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserAddComponent } from './user-add/user-add.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AdminConfigNavComponent,
    UserManagerComponent,
    UserListComponent,
    PasswordChangeComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    AdminConfigRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    DataTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SharedFormControlsModule,
    TranslateModule,
    MatSlideToggleModule
  ]
})
export class AdminConfigModule { }
