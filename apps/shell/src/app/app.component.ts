import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {
  EventDispatcherService,
  GlobalCustomEvent,
  MiniVideoPayload,
  WebApiService,
  LocalStorageEnum,
} from '@youtube/common-ui';
import { Observable, Subject, takeUntil } from 'rxjs';

import { VideoStoreService } from './core/services/video-store/video-store.service';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public miniVideo$?: Observable<MiniVideoPayload>;
  public isMiniPlayerMode$?: Observable<boolean>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
    private router: Router,
    private eventDispatcher: EventDispatcherService,
    private webApiService: WebApiService,
    private title: Title
  ) {}

  public ngOnInit(): void {
    this.selectStoreData();
    this.initGlobalEventListeners();
    this.setMetaTags();
    this.tryRestoreMiniVideoSetings();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onCloseVideo(): void {
    this.videoStore.setIsMiniPlayerMode(false);
    this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
  }

  public onExpandVideo(videoPayload: MiniVideoPayload): void {
    const { videoId, startSeconds } = videoPayload;
    this.videoStore.setIsMiniPlayerMode(false);
    this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
    this.router.navigate(['/watch'], { queryParams: { v: videoId, t: startSeconds } });
  }

  private selectStoreData(): void {
    this.miniVideo$ = this.videoStore.selectMiniPlayerVideo();
    this.isMiniPlayerMode$ = this.videoStore.selectIsMiniPlayerMode();
  }

  private initGlobalEventListeners(): void {
    this.eventDispatcher
      .on(GlobalCustomEvent.WATCH_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.videoStore.setIsMiniPlayerMode(false);
        this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
        this.router.navigate(['/watch'], { queryParams: { v: videoId } });
      });

    this.eventDispatcher
      .on(GlobalCustomEvent.NAVIGATE)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const url = event.detail.url;
        this.router.navigateByUrl(url);
      });
  }

  private setMetaTags(): void {
    this.title.setTitle(`Youtube Angular Clone`);
  }

  private tryRestoreMiniVideoSetings(): void {
    const localStorageRef = this.webApiService.localStorage;
    const settings = localStorageRef.getItem(LocalStorageEnum.MINI_WIDEO_SETTINGS);
    if (!settings) {
      return;
    }
    this.videoStore.setIsMiniPlayerMode(true);
    this.videoStore.setMiniPlayerVideo(JSON.parse(settings));
  }
}
