import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IYoutubeSearchResult, IYoutubeService, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'watch-app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedVideosComponent implements OnChanges {
  @Input() query!: string;
  @Input() relatedVideos?: IYoutubeSearchResult[];
  public items = new Array(5);
  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService, private cdr: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const queryChange = changes && changes['query'];
    if (queryChange) {
      this.getRelatedVideos();
    }
  }

  private getRelatedVideos(): void {
    this.youtubeService
      .searchVideoResults({ query: this.query?.slice(0, 10) })
      .pipe(filter((results) => !!results?.length))
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.relatedVideos = results;
        this.cdr.detectChanges();
      });
  }
}
