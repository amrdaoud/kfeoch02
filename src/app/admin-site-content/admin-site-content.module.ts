import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSiteContentRoutingModule } from './admin-site-content-routing.module';
import { AdminSiteContentNavComponent } from './admin-site-content-nav/admin-site-content-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminSiteContentNoPhotoComponent } from './admin-site-content-no-photo/admin-site-content-no-photo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxEditorModule } from 'ngx-editor';
import { AdminSiteContentWithPhotoComponent } from './admin-site-content-with-photo/admin-site-content-with-photo.component';
import { AdminSiteContentWithPostsComponent } from './admin-site-content-with-posts/admin-site-content-with-posts.component';
import { MatTableModule } from '@angular/material/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PostFormComponent } from './post-form/post-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AlbumFormComponent } from './album-form/album-form.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { AdminSiteContentVideosComponent } from './admin-site-content-videos/admin-site-content-videos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AdminSiteContentNavComponent,
    AdminSiteContentNoPhotoComponent,
    AdminSiteContentWithPhotoComponent,
    AdminSiteContentWithPostsComponent,
    PostFormComponent,
    AlbumFormComponent,
    PhotoFormComponent,
    AdminSiteContentVideosComponent
  ],
  imports: [
    CommonModule,
    AdminSiteContentRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatGridListModule,
    SharedFormControlsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgxEditorModule,
    FormsModule,
    MatTableModule,
    DragDropModule,
    MatTabsModule
  ]
})
export class AdminSiteContentModule { }
