import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CustomEventConfig,
  EventDispatcherService,
  GlobalCustomEvent,
  IYoutubeSearchResult,
  IYoutubeService,
  ToastService,
  YOUTUBE_SERVICE,
  WebApiService,
} from '@youtube/common-ui';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'watch-app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchVideoComponent implements OnInit, OnDestroy {
  public videoId!: string;
  public startSeconds?: number;
  public videoInfo?: IYoutubeSearchResult;
  // fallback video in case api v2 fails.
  public fallBackVideoInfo?: IYoutubeSearchResult;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private eventDispatcher: EventDispatcherService,
    private webApiService: WebApiService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private listenToEvents(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.onDestroy$),
        tap((params: Params) => {
          this.videoId = params['v'];
          this.startSeconds = params['t'] || 1;
          this.cdr.detectChanges();
        }),
        switchMap(() => this.getVideoInfo())
      )
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.videoInfo = results && results?.find((result) => result.id?.videoId === this.videoId);
        if (this.videoInfo) {
          this.fallBackVideoInfo = this.videoInfo;
        } else {
          this.handleCaseVideoNotFound();
        }
        this.cdr.detectChanges();
        this.scrollToTop();
        const config: CustomEventConfig = {
          detail: {
            videoId: this.videoId,
          },
        };
        this.eventDispatcher.dispatchEvent(GlobalCustomEvent.ADD_VIDEO_TO_WATCH_HISTORY, config);
      });
  }

  private getVideoInfo(): Observable<IYoutubeSearchResult[]> {
    return this.youtubeService.searchVideoResults({ query: this.videoId }).pipe(catchError(() => EMPTY));
  }

  private handleCaseVideoNotFound(): void {
    this.showVideoNotFoundToast();
    if (this.fallBackVideoInfo) {
      this.videoInfo = this.fallBackVideoInfo;
      this.videoId = this.fallBackVideoInfo.id.videoId;
      this.startSeconds = 0;
    } else {
      this.navigateToHome();
    }
  }

  private showVideoNotFoundToast(): void {
    this.toastService.open({ type: 'error', message: 'Oops. Video is not found', action: 'Error' });
  }

  private navigateToHome(): void {
    const config: CustomEventConfig = {
      detail: {
        url: '/',
      },
    };
    this.eventDispatcher.dispatchEvent(GlobalCustomEvent.NAVIGATE, config);
  }

  private scrollToTop(): void {
    const scrollContent = this.webApiService.document.getElementsByClassName('mat-drawer-content')?.[0];
    scrollContent?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
