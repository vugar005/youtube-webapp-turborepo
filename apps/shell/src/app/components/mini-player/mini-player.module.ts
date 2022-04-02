import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VideoPlayerModule } from '@youtube/common-ui';
import { MiniPlayerComponent } from './mini-player.component';

@NgModule({
  declarations: [MiniPlayerComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, VideoPlayerModule],
  exports: [MiniPlayerComponent],
})
export class MiniPlayerModule {}
