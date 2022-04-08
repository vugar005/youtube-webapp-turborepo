import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IYoutubeSearchItem, IYoutubeVideoItem } from '../../models';

@Component({
  selector: 'ytd-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailComponent {
  @Input() searchItem?: IYoutubeSearchItem;
  @Input() videoDetail?: IYoutubeVideoItem;
  @Input() direction?: 'vertical' | 'horizontal' = 'horizontal';
}
