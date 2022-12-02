import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IYoutubeSearchItem, IYoutubeVideoItem } from '../../models';
import { TimeAgoPipe, AbbreviateNumberPipe } from '../../pipes';

@Component({
  standalone: true,
  selector: 'ytd-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TimeAgoPipe, AbbreviateNumberPipe, NgOptimizedImage],
})
export class VideoThumbnailComponent {
  @Input() searchItem?: IYoutubeSearchItem;
  @Input() videoDetail?: IYoutubeVideoItem;
  @Input() direction?: 'vertical' | 'horizontal' = 'horizontal';
  @Input() isNowPlaying?: boolean;
  @Input() priority = false;
}
