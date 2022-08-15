import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  CustomEventConfig,
  EventDispatcherService,
  GlobalCustomEvent,
  IYoutubeSearchItem,
  IYoutubeService,
  VideoThumbnailComponent,
  VideoThumbnailLoaderComponent,
  YOUTUBE_SERVICE,
} from '@youtube/common-ui';
import { EMPTY, forkJoin, Observable, Subject } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';
import { UIStoreService } from '../core/services/ui-store/ui-store.service';

@Component({
  standalone: true,
  selector: 'likes-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    VideoThumbnailComponent,
    VideoThumbnailLoaderComponent,
    MatDividerModule,
    MatIconModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  public likedVideos?: IYoutubeSearchItem[] = [];
  public videoIds: string[] = [];
  public isLoading!: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private uiStore: UIStoreService,
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
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

  private initStoreData(): void {
    this.uiStore
      .selectLikedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: string[]) => {
        this.videoIds = data;
        this.getLikedVideosInfo(data);
        this.cdr.detectChanges();
      });
  }

  private getLikedVideosInfo(videoIds: string[]): void {
    const reqArray: Observable<IYoutubeSearchItem>[] = [];
    videoIds?.forEach((id: string) => {
      const videoRequest = this.youtubeService.searchList({ query: id }).pipe(
        map((data) => data.items?.[0]),
        filter(Boolean)
      );
      reqArray.push(videoRequest);
    });

    forkJoin(reqArray)
      .pipe(catchError(() => EMPTY))
      .subscribe((data: IYoutubeSearchItem[]) => {
        this.likedVideos = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }
}
