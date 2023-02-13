import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSiteContentNavComponent } from './admin-site-content-nav/admin-site-content-nav.component';
import { AdminSiteContentNoPhotoComponent } from './admin-site-content-no-photo/admin-site-content-no-photo.component';
import { AdminSiteContentVideosComponent } from './admin-site-content-videos/admin-site-content-videos.component';
import { AdminSiteContentWithPhotoComponent } from './admin-site-content-with-photo/admin-site-content-with-photo.component';
import { AdminSiteContentWithPostsComponent } from './admin-site-content-with-posts/admin-site-content-with-posts.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PostFormComponent } from './post-form/post-form.component';

const routes: Routes = [
  {path: '', component: AdminSiteContentNavComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'reference-and-objectives'},
    {path: 'reference-and-objectives', component: AdminSiteContentNoPhotoComponent},
    {path: 'statute-and-regulations', component: AdminSiteContentNoPhotoComponent},
    {path: 'conditions', component: AdminSiteContentNoPhotoComponent},
    {path: 'policy', component: AdminSiteContentNoPhotoComponent},
    {path: 'property', component: AdminSiteContentNoPhotoComponent},
    {path: 'sitemap', component: AdminSiteContentNoPhotoComponent},
    {path: 'questions', component: AdminSiteContentNoPhotoComponent},
    {path: 'chairman-word', component: AdminSiteContentWithPhotoComponent},
    {path: 'board', component: AdminSiteContentWithPostsComponent},
    {path: 'board/posts/:pageId/:id', component: PostFormComponent},
    {path: 'board/posts/:pageId', component: PostFormComponent},
    {path: 'news', component: AdminSiteContentWithPostsComponent},
    {path: 'news/posts/:pageId/:id', component: PostFormComponent},
    {path: 'news/posts/:pageId', component: PostFormComponent},
    {path: 'courses', component: AdminSiteContentWithPostsComponent},
    {path: 'courses/posts/:pageId/:id', component: PostFormComponent},
    {path: 'courses/posts/:pageId', component: PostFormComponent},
    {path: 'photos', component: AdminSiteContentWithPostsComponent},
    {path: 'photos/posts/:pageId/:id', component: AlbumFormComponent},
    {path: 'photos/posts/:pageId', component: AlbumFormComponent},
    {path: 'photos/posts/:pageId/:id/sections', component: PhotoFormComponent},
    {path: 'videos', component: AdminSiteContentVideosComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSiteContentRoutingModule { }
