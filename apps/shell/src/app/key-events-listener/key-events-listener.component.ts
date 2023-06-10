import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import {
  WebApiService,
  WindowEnum,
  EventDispatcherService,
  CustomEventConfig,
  GlobalCustomEvent,
} from '@youtube/common-ui';
import { take } from 'rxjs';
import { VideoStoreService } from '../core/services/video-store/video-store.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'yt-key-events-listener',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class KeyEventsListenerComponent {
  constructor(
    private webApi: WebApiService,
    private videoStore: VideoStoreService,
    private eventDispatcher: EventDispatcherService
  ) {}

  @HostListener('window:keydown.k', ['$event'])
  public onKeyDownK(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }

    this.togglePlayPause();
  }

  @HostListener('window:keydown.j', ['$event'])
  public onKeyDownJ(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }
    this.seekVideoBy(-10);
  }

  @HostListener('window:keydown.l', ['$event'])
  public onKeyDownL(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }
    this.seekVideoBy(10);
  }

  @HostListener('window:keydown.m', ['$event'])
  public onKeyDownM(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }
    this.toggleMute();
  }

  @HostListener('window:keydown.f', ['$event'])
  public onKeyDownF(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }

    this.toggleFullScreen();
  }

  @HostListener('window:keydown.i', ['$event'])
  public onKeyDownI(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }

    this.toggleMiniPlayer();
  }

  @HostListener('window:keydown.ESCAPE', ['$event'])
  public onKeyDownEscape(event: KeyboardEvent): void {
    if (!this.isWhiteListedTarget(event)) {
      return;
    }

    this.closeMiniPlayer();
  }

  private get playerRef(): YT.Player | null {
    const playerFrameId = (this.webApi.window as any)[WindowEnum.CURRENT_VIDEO_FRAME_ID];
    return ((this.webApi.window as any).YT as any).get(playerFrameId) as YT.Player;
  }

  private get iFrameRef(): HTMLElement | null {
    const playerFrameId = (this.webApi.window as any)[WindowEnum.CURRENT_VIDEO_FRAME_ID];
    return document.getElementById(playerFrameId);
  }

  private seekVideoBy(seconds: number, allowSeekAhead = true): void {
    if (!this.playerRef) {
      return;
    }
    const currentTime = this.playerRef.getCurrentTime();
    const seekTo = currentTime + seconds;
    this.playerRef.seekTo(seekTo, allowSeekAhead);
  }

  private togglePlayPause(): void {
    if (!this.playerRef) {
      return;
    }
    const playerState = this.playerRef.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) {
      this.playerRef.pauseVideo();
    } else {
      this.playerRef.playVideo();
    }
  }

  private toggleMute(): void {
    if (!this.playerRef) {
      return;
    }
    const isMuted = this.playerRef.isMuted();
    if (isMuted) {
      this.playerRef.unMute();
    } else {
      this.playerRef.mute();
    }
  }

  private toggleFullScreen(): void {
    if (!this.iFrameRef) {
      return;
    }
    if (!this.isFullScreen) {
      this.iFrameRef?.requestFullscreen();
    } else {
      const documentRef = this.webApi.document;
      documentRef?.exitFullscreen();
    }
  }

  private get isFullScreen(): boolean {
    const documentRef = this.webApi.document;
    return (documentRef as any).webkitIsFullScreen || (documentRef as any).mozFullScreen;
  }

  private toggleMiniPlayer(): void {
    this.videoStore
      .selectIsMiniPlayerMode()
      .pipe(take(1))
      .subscribe((isMiniMode) => {
        if (!this.playerRef) {
          return;
        }

        const videoId = (this.playerRef as any).videoId;
        const startSeconds = this.playerRef.getCurrentTime();
        if (!isMiniMode) {
          this.videoStore.setIsMiniPlayerMode(true);
          this.videoStore.setMiniPlayerVideo({ videoId, startSeconds });
          const config: CustomEventConfig = {
            detail: {
              url: '/',
            },
          };
          this.eventDispatcher.dispatchEvent(GlobalCustomEvent.NAVIGATE, config);
        } else {
          this.videoStore.setIsMiniPlayerMode(false);
          this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
          const config: CustomEventConfig = {
            detail: {
              url: `/watch?v=${videoId}&t=${startSeconds}`,
            },
          };
          this.eventDispatcher.dispatchEvent(GlobalCustomEvent.NAVIGATE, config);
        }
      });
  }

  private closeMiniPlayer(): void {
    this.videoStore.setIsMiniPlayerMode(false);
    this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
  }

  private isWhiteListedTarget(event: KeyboardEvent): boolean {
    const target = event.target as Element;
    if (target.tagName === 'INPUT') {
      return false;
    }
    return true;
  }
}
