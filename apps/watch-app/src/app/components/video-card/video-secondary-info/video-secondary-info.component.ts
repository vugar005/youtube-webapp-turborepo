import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IYoutubeVideoItem } from '@youtube/common-ui';

@Component({
  selector: 'watch-app-video-secondary-info',
  templateUrl: './video-secondary-info.component.html',
  styleUrls: ['./video-secondary-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoSecondaryInfoComponent {
  @Input() videoItem?: IYoutubeVideoItem;
  public isExpanded = false;

  public onSetExpand(value: boolean): void {
    this.isExpanded = value;
  }
}
