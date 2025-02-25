import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IYoutubeVideoItem } from '@youtube/common-ui';

@Component({
  standalone: true,
  selector: 'watch-app-video-secondary-info',
  templateUrl: './video-secondary-info.component.html',
  styleUrls: ['./video-secondary-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule],
})
export class VideoSecondaryInfoComponent {
  @Input() videoItem?: IYoutubeVideoItem;
  public isExpanded = false;

  public onSetExpand(value: boolean): void {
    this.isExpanded = value;
  }
}
