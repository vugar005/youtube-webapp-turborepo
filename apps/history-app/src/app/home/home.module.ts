import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';

import { VideoThumbnailLoaderModule, VideoThumbnailModule } from '@youtube/common-ui';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    VideoThumbnailModule,
    VideoThumbnailLoaderModule,
    MatDividerModule,
  ],
})
export class HomeModule {}
