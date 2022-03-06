import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MiniVideoPayload, VideoPlayerComponent } from '@youtube/common-ui';
@Component({
  selector: 'yt-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniPlayerComponent {
  @Output() readonly closeVideo = new EventEmitter<void>();
  @Output() readonly expandVideo = new EventEmitter<MiniVideoPayload>();

  @ViewChild(VideoPlayerComponent) videoPlayerRef?: VideoPlayerComponent;

  @Input() startSeconds: number | undefined;
  @Input() videoId?: string;

  public readonly playerVars: YT.PlayerVars = {
    modestbranding: 0,
    controls: 0,
  };
  public isPointEventsEnabled?: boolean;
  public playerState?: YT.PlayerState;
  public videoTitle?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  public onPlayToggle(): void {
    const playerRef = this.videoPlayerRef?.player;
    const playerState = playerRef?.getPlayerState();
    if (playerState === 1) {
      playerRef?.pauseVideo();
    } else if (playerState === 2) {
      playerRef?.playVideo();
    }
  }

  public onPlayerStateChange(state: YT.PlayerState): void {
    this.playerState = state;
    this.cdr.detectChanges();
  }

  public get isPlayerControlsVisible(): boolean {
    return this.playerState === 1 || this.playerState === 2;
  }

  public onCloseVideo(): void {
    this.closeVideo.next();
  }

  public onExpandVideo(): void {
    const player = this.videoPlayerRef?.player;
    const videoId = (player as any).videoId;
    const currentTime = player?.getCurrentTime() || 0;
    this.expandVideo.next({ videoId, startSeconds: currentTime });
  }

  public onVideoLoaded(player: YT.Player): void {
    const videoData = (player as any).getVideoData();
    this.videoTitle = videoData?.title;
  }
}
