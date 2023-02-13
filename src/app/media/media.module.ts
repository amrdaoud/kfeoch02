import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumPhotosComponent } from './album-photos/album-photos.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { LightgalleryModule } from 'lightgallery/angular';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoComponent } from './video/video.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumPhotosComponent,
    VideoComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatGridListModule,
    LightgalleryModule,
    YouTubePlayerModule
  ]
})
export class MediaModule { }
