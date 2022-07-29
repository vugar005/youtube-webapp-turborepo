import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IYoutubeSearchResult,
  IYoutubeSearchItem,
  IYoutubeService,
  YOUTUBE_SERVICE,
  VideoThumbnailComponent,
  VideoThumbnailLoaderComponent,
} from '@youtube/common-ui';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'watch-app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, VideoThumbnailComponent, VideoThumbnailLoaderComponent, RouterModule],
})
export class RelatedVideosComponent implements OnChanges {
  @Input() query!: string | undefined;
  @Input() relatedVideos?: IYoutubeSearchItem[];
  public items = new Array(5);
  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService, private cdr: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const queryChange = changes && changes['query'];
    if (queryChange) {
      this.getRelatedVideos();
    }
  }

  private getRelatedVideos(): void {
    if (!this.query) {
      return;
    }
    this.youtubeService
      .searchList({ query: this.query })
      .pipe(filter((results) => !!results?.items?.length))
      .subscribe((results: IYoutubeSearchResult) => {
        this.relatedVideos = results?.items;
        this.cdr.detectChanges();
      });
  }
}
