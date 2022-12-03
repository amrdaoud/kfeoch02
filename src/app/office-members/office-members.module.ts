import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeMembersRoutingModule } from './office-members-routing.module';
import { OfficeMembersNavComponent } from './office-members-nav/office-members-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OfficeMemberListComponent } from './office-member-list/office-member-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MemberFormComponent } from './member-form/member-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    OfficeMembersNavComponent,
    OfficeMemberListComponent,
    MemberFormComponent
  ],
  imports: [
    CommonModule,
    OfficeMembersRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    MatGridListModule
  ]
})
export class OfficeMembersModule { }
