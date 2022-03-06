import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AspectRatioDirectiveModule } from '../../directives';

import { VideoThumbnailLoaderComponent } from './video-thumbnail-loader.component';
@NgModule({
  imports: [CommonModule, AspectRatioDirectiveModule],
  declarations: [VideoThumbnailLoaderComponent],
  exports: [VideoThumbnailLoaderComponent],
})
export class VideoThumbnailLoaderModule {}
