import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageTemplateComponent } from './page-template/page-template.component';
import { PageTemplateNoPhotoComponent } from './page-template-no-photo/page-template-no-photo.component';
import { MatCardModule } from '@angular/material/card';
import { PageTemplateWithPhotoComponent } from './page-template-with-photo/page-template-with-photo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PageTemplateWithPostsComponent } from './page-template-with-posts/page-template-with-posts.component';
import { PageTemplateNewsComponent } from './page-template-news/page-template-news.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { PageTemplateNewsPostComponent } from './page-template-news-post/page-template-news-post.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedFormControlsModule } from '../shared-form-controls/shared-form-controls.module';


@NgModule({
  declarations: [
    PageTemplateComponent,
    PageTemplateNoPhotoComponent,
    PageTemplateWithPhotoComponent,
    PageTemplateWithPostsComponent,
    PageTemplateNewsComponent,
    PageTemplateNewsPostComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    MatGridListModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    SharedFormControlsModule,
  ]
})
export class PagesModule { }
