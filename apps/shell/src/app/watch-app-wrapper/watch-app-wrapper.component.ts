import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDispatcherService, GlobalCustomEvent, WatchAPPEvents } from '@youtube/common-ui';
import { Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { AccountStoreService } from '../core/services/account-store/account-store.service';
import { VideoStoreService } from '../core/services/video-store/video-store.service';
import { registry } from '../registry';

@Component({
  selector: 'yt-watch-app-wrapper',
  templateUrl: './watch-app-wrapper.component.html',
  styleUrls: ['./watch-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchAppWrapperComponent implements OnInit, OnDestroy {
  public isElementLoaded?: boolean;
  public likedVideosList$!: Observable<string[]>;
  public dislikedVideosList$!: Observable<string[]>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventDispatcher: EventDispatcherService,
    private accountStore: AccountStoreService,
    private videoStore: VideoStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadElement();
    this.initStoreData();
    this.initWatchAppListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public loadElement(): void {
    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = registry[importName];
    importFn()
      .then(() => {
        this.isElementLoaded = true;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => console.error(`error loading ${elementName}:`, err));
  }

  private initWatchAppListeners(): void {
    this.eventDispatcher
      .on(WatchAPPEvents.TOGGLE_LIKE_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.accountStore.toggleLikeVideo({ videoId });
      });

    this.eventDispatcher
      .on(WatchAPPEvents.TOGGLE_DISLIKE_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.accountStore.toggleDislikeVideo({ videoId });
      });

    this.eventDispatcher
      .on(WatchAPPEvents.ENABLE_MINIPLAYER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        const startSeconds = event.detail.startSeconds;
        this.videoStore.setIsMiniPlayerMode(true);
        this.videoStore.setMiniPlayerVideo({ videoId: videoId, startSeconds: startSeconds });
        this.router.navigateByUrl('/');
      });

    this.eventDispatcher
      .on(GlobalCustomEvent.ADD_VIDEO_TO_WATCH_HISTORY)
      .pipe(withLatestFrom(this.accountStore.selectIsWatchHistoryEnabled()), takeUntil(this.onDestroy$))
      .subscribe(([event, isEnabled]) => {
        const videoId = event.detail.videoId;
        if (isEnabled) {
          this.accountStore.addVideoToHistoryList({ videoId });
        }
      });
  }

  private initStoreData(): void {
    this.likedVideosList$ = this.accountStore.selectLikedVideoList();
    this.dislikedVideosList$ = this.accountStore.selectDislikedVideoList();
  }
}
