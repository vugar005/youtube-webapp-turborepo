import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  CustomEventConfig,
  EventDispatcherService,
  GlobalCustomEvent,
  HistoryAppEvent,
  IYoutubeSearchItem,
  IYoutubeService,
  VideoThumbnailComponent,
  VideoThumbnailLoaderComponent,
  YOUTUBE_SERVICE,
} from '@youtube/common-ui';
import { filter, finalize, forkJoin, map, Observable, Subject, takeUntil } from 'rxjs';
import { UIStoreService } from '../core/services/ui-store/ui-store.service';

@Component({
  standalone: true,
  selector: 'history-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    VideoThumbnailComponent,
    VideoThumbnailLoaderComponent,
    MatDividerModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() watchedVideoIds?: string[];
  public watchedVideos: IYoutubeSearchItem[] = [];
  public isWatchHistoryEnabled?: boolean;
  public isLoading?: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private uiStore: UIStoreService,
    private eventDispatcher: EventDispatcherService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initStoreData();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onWatchVideo(videoId: string | undefined): void {
    if (!videoId) {
      return;
    }
    const config: CustomEventConfig = { detail: { videoId: videoId } };
    this.eventDispatcher.dispatchEvent(GlobalCustomEvent.WATCH_VIDEO, config);
  }

  public onBrowseVideos(): void {
    const config: CustomEventConfig = { detail: { url: '/' } };
    this.eventDispatcher.dispatchEvent(GlobalCustomEvent.NAVIGATE, config);
  }

  public onToggleWatchHistoryEnable(): void {
    const config: CustomEventConfig = { detail: { isActive: !this.isWatchHistoryEnabled } };

    this.eventDispatcher.dispatchEvent(HistoryAppEvent.TOGGLE_IS_WATCH_HISTORY_ENABLED, config);
  }

  public onClearWatchHistory(): void {
    this.eventDispatcher.dispatchEvent(HistoryAppEvent.CLEAR_WATCH_HISTORY);
  }

  private initStoreData(): void {
    this.uiStore
      .selectWatchedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: string[]) => {
        this.watchedVideoIds = data;
        this.getWatchedVideos(data);
        this.cdr.detectChanges();
      });

    this.uiStore
      .selectIsWatchHistoryEnabled()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isEnabled: boolean) => {
        this.isWatchHistoryEnabled = isEnabled;
        this.cdr.detectChanges();
      });
  }

  private getWatchedVideos(videoIds: string[] | undefined): void {
    this.watchedVideos = [];
    this.isLoading = true;
    if (!videoIds?.length) {
      this.isLoading = false;
    }
    this.cdr.detectChanges();

    const reqArray: Observable<IYoutubeSearchItem>[] = [];
    videoIds?.forEach((id: string) => {
      const videoRequest = this.youtubeService.searchList({ query: id }).pipe(
        map((data) => data.items?.[0]),
        filter(Boolean)
      );
      reqArray.push(videoRequest);
    });

    forkJoin(reqArray)
      .pipe(
        takeUntil(this.onDestroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((data: IYoutubeSearchItem[]) => {
        this.watchedVideos = data;
        this.cdr.detectChanges();
      });
  }
}
