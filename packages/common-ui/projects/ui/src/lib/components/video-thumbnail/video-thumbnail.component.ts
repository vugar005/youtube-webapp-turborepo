import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IYoutubeSearchSnippet } from '../../models/youtube-search-list.model';

@Component({
  selector: 'ytd-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailComponent {
  @Input() snippet?: IYoutubeSearchSnippet;
  @Input() direction?: 'vertical' | 'horizontal' = 'horizontal';
}
