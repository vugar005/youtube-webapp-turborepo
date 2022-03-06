import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoThumbnailComponent } from './video-thumbnail.component';
import { TimeAgoPipeModule } from '../../pipes';
import { AspectRatioDirectiveModule } from '../../directives';

@NgModule({
  declarations: [VideoThumbnailComponent],
  imports: [CommonModule, TimeAgoPipeModule, AspectRatioDirectiveModule],
  exports: [VideoThumbnailComponent],
})
export class VideoThumbnailModule {}
