import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MiniPlayerComponent } from './mini-player.component';
import { VideoPlayerComponent } from '@youtube/common-ui';

@NgModule({
  declarations: [MiniPlayerComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, VideoPlayerComponent],
  exports: [MiniPlayerComponent],
})
export class MiniPlayerModule {}
