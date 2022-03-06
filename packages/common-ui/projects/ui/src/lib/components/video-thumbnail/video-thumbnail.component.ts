import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { VideoSnippet } from '../../models/youtube-search-list.model';

@Component({
  selector: 'yt-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailComponent {
  @Input() snippet?: VideoSnippet;
  @Input() direction?: 'vertical' | 'horizontal' = 'horizontal';
}
