import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { WindowEnum } from '../../constants';
import { WebApiService } from '../../services';

@Component({
  selector: 'yt-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Output() readonly stateChange = new EventEmitter<YT.PlayerState>();
  @Output() readonly videoLoaded = new EventEmitter<YT.Player>();
  @Input() videoId?: string;
  @Input() startSeconds? = 1;
  @Input() width?: number;
  @Input() height = 170;
  @Input() playerVars?: YT.PlayerVars = {
    showinfo: 0,
    modestbranding: 0,
  };
  public isIframLoaded!: boolean;

  private playerRef?: YT.Player;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private element: ElementRef, private webApi: WebApiService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadIframScript();
    this.listenToWindowResize();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngAfterViewInit(): void {
    this.setVideoDimensions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const videoIdChange = changes['videoId'];
    const startSecondsChange = changes['startSeconds'];
    if (videoIdChange && !videoIdChange.isFirstChange) {
      this.player?.loadVideoById(videoIdChange.currentValue, 1);
    }
    if (startSecondsChange && startSecondsChange.currentValue) {
      this.player?.seekTo(startSecondsChange.currentValue || 1, true);
    }
  }

  public onReady(event: YT.PlayerEvent): void {
    this.playerRef = event.target;
    this.stateChange.next(this.playerRef.getPlayerState());
    this.videoLoaded.next(this.playerRef);
    event.target.playVideo();
  }

  public onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
      console.log('CUE');
      this.playerRef?.playVideo();
      this.playerRef?.seekTo(this.startSeconds || 1, true);
      this.videoLoaded.next(this.playerRef!);
      // eslint-disable-next-line
      const frameId = (this.playerRef as any)?.h?.id;
      // eslint-disable-next-line
      (this.webApi.window as any)[WindowEnum.CURRENT_VIDEO_FRAME_ID] = frameId;
    }
    this.stateChange.next(event.data);
  }

  public get player(): YT.Player | undefined {
    return this.playerRef;
  }

  private loadIframScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      this.isIframLoaded = true;
      this.cdr.detectChanges();
    });
  }

  private listenToWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this.onDestroy$))
      .subscribe(() => this.setVideoDimensions());
  }

  private setVideoDimensions(): void {
    const el = this.element.nativeElement.parentElement;
    this.width = el.clientWidth;
    this.height = el.clientHeight;
    this.cdr.detectChanges();
  }
}
