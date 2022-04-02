import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IYoutubeService, IYoutubeSearchResult, IYoutubeSearchItem, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { catchError, EMPTY, Observable, Subject, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { AccountStoreService } from '../core/services/account-store/account-store.service';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrls: ['./browse-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseVideosComponent implements OnInit, OnDestroy {
  public videoLinks?: IYoutubeSearchItem[] = [];
  public videoWidth?: number;
  public items = new Array(18);
  public isLoading = false;
  public hasError = false;
  public isServer!: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private videoStore: VideoStoreService,
    private accountStore: AccountStoreService,
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
    this.isServer = isPlatformServer(this.platformId);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSelectVideo(videoId?: string): void {
    if (!videoId) {
      return;
    }
    this.videoStore
      .selectIsMiniPlayerMode()
      .pipe(withLatestFrom(this.accountStore.selectIsWatchHistoryEnabled()), take(1))
      .subscribe(([isMiniMode, isHistoryEnabled]) => {
        if (isMiniMode) {
          this.videoStore.setMiniPlayerVideo({ videoId, startSeconds: 1 });
          if (isHistoryEnabled) {
            this.accountStore.addVideoToHistoryList({ videoId });
          }
        } else {
          this.router.navigate(['/watch'], { queryParams: { v: videoId, t: 1 } });
        }
      });
  }

  private listenToEvents(): void {
    this.listenToSearchQuery();
  }

  private listenToSearchQuery(): void {
    this.videoStore
      .selectSearchQuery()
      .pipe(
        tap(() => {
          this.setLoading(true);
          this.setHasError(false);
        }),
        switchMap((query: string) => this.getSearchRequest(query)),
        takeUntil(this.onDestroy$)
      )
      .subscribe((result: IYoutubeSearchResult) => {
        this.videoLinks = result?.items;
        this.setLoading(false);
        this.cdr.detectChanges();
      });
  }

  private setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cdr.detectChanges();
  }

  private setHasError(value: boolean): void {
    this.hasError = value;
    this.cdr.detectChanges();
  }

  private getSearchRequest(query: string): Observable<IYoutubeSearchResult> {
    return this.youtubeService.searchList({ query }).pipe(
      catchError(() => {
        this.setHasError(true);
        this.cdr.detectChanges();
        return EMPTY;
      })
    );
  }
}
