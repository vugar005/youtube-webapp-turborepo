import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import {
  CustomEventConfig,
  EventDispatcherService,
  IYoutubeSearchResult,
  ShareVideoDialogComponent,
  VideoPlayerComponent,
  WatchAPPEvents,
  WebApiService,
  ToastService,
  GlobalCustomEvent,
} from '@youtube/common-ui';
import { Subject, takeUntil } from 'rxjs';
import { UIStoreService } from '../core/services/ui-store/ui-store.service';

@Component({
  selector: 'watch-app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent implements OnInit, OnDestroy {
  @ViewChild(VideoPlayerComponent) videoPlayer?: VideoPlayerComponent;
  @Input() videoId!: string;
  @Input() startSeconds: number | undefined;
  @Input() videoResult?: IYoutubeSearchResult;
  public likedVideos: string[] = [];
  public dislikedVideos: string[] = [];

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private uiStore: UIStoreService,
    private eventDispatcher: EventDispatcherService,
    private dialog: MatDialog,
    private webApiService: WebApiService,
    private title: Title,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initStoreData();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onShareVideo(): void {
    const currenVideoTime = this.videoPlayer?.player?.getCurrentTime();
    const videoUrl = `${this.webApiService.location.host}/watch?v=${this.videoId}`;
    this.dialog.open(ShareVideoDialogComponent, { data: { currenVideoTime, videoUrl }, autoFocus: false });
  }

  public get isLiked(): boolean {
    return this.likedVideos?.includes(this.videoId);
  }

  public get isDisLiked(): boolean {
    return this.dislikedVideos?.includes(this.videoId);
  }

  public onToggleLike(): void {
    if (!this.isLiked) {
      this.showLikedToast();
    }
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.TOGGLE_LIKE_VIDEO, config);
  }

  public onToggleDisLike(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.TOGGLE_DISLIKE_VIDEO, config);
  }

  public onMiniPlayerMode(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
        startSeconds: this.videoPlayer?.player?.getCurrentTime(),
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.ENABLE_MINIPLAYER, config);
  }

  public onVideoReady(player: YT.Player): void {
    this.setMetaTags(player);
  }

  public showLikedToast(): void {
    this.toastService
      .open({ message: 'Added to liked videos', action: 'Visit now', duration: 4000 })
      .onAction()
      .subscribe(() => {
        const config: CustomEventConfig = { detail: { url: '/liked' } };

        this.eventDispatcher.dispatchEvent(GlobalCustomEvent.NAVIGATE, config);
      });
  }

  private initStoreData(): void {
    this.uiStore
      .selectLikedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.likedVideos = data;
        this.cdr.detectChanges();
      });

    this.uiStore
      .selectDislikedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.dislikedVideos = data;
        this.cdr.detectChanges();
      });
  }

  private setMetaTags(player: YT.Player): void {
    const videoData = (player as any).getVideoData();
    this.title.setTitle(videoData?.title);
  }
}
