import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import {
  VideoPlayerModule,
  VideoThumbnailModule,
  VideoThumbnailLoaderModule,
  ShareVideoDialogModule,
  AbbreviateNumberPipeModule,
  ToastModule,
} from '@youtube/common-ui';
import { RelatedVideosComponent } from '../components/related-videos/related-videos.component';
import { VideoCardComponent } from '../components/video-card/video-card.component';
import { VideoSecondaryInfoComponent } from '../components/video-card/video-secondary-info/video-secondary-info.component';
import { WatchVideoComponent } from './watch-video.component';

@NgModule({
  declarations: [WatchVideoComponent, VideoCardComponent, RelatedVideosComponent, VideoSecondaryInfoComponent],
  imports: [
    CommonModule,
    VideoPlayerModule,
    VideoThumbnailModule,
    VideoThumbnailLoaderModule,
    ShareVideoDialogModule,
    AbbreviateNumberPipeModule,
    ToastModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    RouterModule,
  ],
})
export class WatchVideoModule {}
