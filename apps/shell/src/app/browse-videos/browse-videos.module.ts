import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseVideosComponent } from './browse-videos.component';
import { MatIconModule } from '@angular/material/icon';
import { VideoThumbnailLoaderModule } from '@youtube/common-ui';
import { MiniSidebarModule } from '../components/mini-sidebar/mini-sidebar.module';
import { VideoThumbnailModule } from '@youtube/common-ui';

@NgModule({
  declarations: [BrowseVideosComponent],
  imports: [CommonModule, MiniSidebarModule, MatIconModule, VideoThumbnailModule, VideoThumbnailLoaderModule],
  exports: [BrowseVideosComponent],
})
export class BrowseVideosModule {}
