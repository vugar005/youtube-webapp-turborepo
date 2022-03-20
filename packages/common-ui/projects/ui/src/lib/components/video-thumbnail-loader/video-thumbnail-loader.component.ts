import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ytd-video-thumbnail-loader',
  templateUrl: './video-thumbnail-loader.component.html',
  styleUrls: ['./video-thumbnail-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailLoaderComponent {
  @Input() direction?: 'vertical' | 'horizontal';
}
