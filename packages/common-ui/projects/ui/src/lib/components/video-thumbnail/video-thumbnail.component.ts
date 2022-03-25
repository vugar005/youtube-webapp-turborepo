import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { IYoutubeSearchItem, IYoutubeService, IYoutubeVideoItem, IYoutubeVideoResult } from '../../models';
import { YOUTUBE_SERVICE } from '../../tokens';

@Component({
  selector: 'ytd-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailComponent implements OnInit {
  @Input() searchItem?: IYoutubeSearchItem;
  @Input() direction?: 'vertical' | 'horizontal' = 'horizontal';
  public videoItem?: IYoutubeVideoItem;

  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.getVideoDetail(this.searchItem?.id?.videoId);
  }

  private getVideoDetail(videoId?: string): void {
    if (!videoId) {
      return;
    }
    this.youtubeService.videoList({ query: videoId }).subscribe((res: IYoutubeVideoResult) => {
      this.videoItem = res?.items[0];
      this.cdr.detectChanges();
    });
  }
}
