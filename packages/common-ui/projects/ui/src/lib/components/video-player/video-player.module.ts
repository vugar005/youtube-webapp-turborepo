import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [CommonModule, YouTubePlayerModule],
  exports: [VideoPlayerComponent],
})
export class VideoPlayerModule {}
