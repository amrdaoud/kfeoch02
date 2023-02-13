import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPhotosComponent } from './album-photos/album-photos.component';
import { AlbumsComponent } from './albums/albums.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'photos'},
  {path: 'photos', component: AlbumsComponent},
  {path: 'photos/:id', component: AlbumPhotosComponent},
  {path: 'videos', component: VideosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
