import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoThumbnailComponent } from './video-thumbnail.component';
import { TimeAgoPipeModule } from '../../pipes';

@NgModule({
  declarations: [VideoThumbnailComponent],
  imports: [CommonModule, TimeAgoPipeModule],
  exports: [VideoThumbnailComponent],
})
export class VideoThumbnailModule {}
