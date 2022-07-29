import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ytd-video-thumbnail-loader',
  templateUrl: './video-thumbnail-loader.component.html',
  styleUrls: ['./video-thumbnail-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class VideoThumbnailLoaderComponent {
  @Input() direction?: 'vertical' | 'horizontal';
}
