import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { VideoThumbnailModule, VideoThumbnailLoaderModule } from '@youtube/common-ui';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    VideoThumbnailModule,
    VideoThumbnailLoaderModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [],
})
export class HomeModule {}
