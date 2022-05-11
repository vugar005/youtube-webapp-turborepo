import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { VideoThumbnailComponent, VideoThumbnailLoaderComponent } from '@youtube/common-ui';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    VideoThumbnailComponent,
    VideoThumbnailLoaderComponent,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [],
})
export class HomeModule {}
