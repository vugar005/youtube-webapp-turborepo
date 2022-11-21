import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  EventDispatcherService,
  GlobalCustomEvent,
  MiniVideoPayload,
  WebApiService,
  LocalStorageEnum,
  SessionStorageEnum,
} from '@youtube/common-ui';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { VideoStoreService } from './core/services/video-store/video-store.service';
import { SHELL_META_TAGS } from 'src/app/app.constants';
import { ThemeService } from './core/services/theme-service/theme.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { PolicyTermsDialogComponent } from './components/policy-terms/policy-terms-dialog/policy-terms-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public miniVideo$?: Observable<MiniVideoPayload>;
  public isMiniPlayerMode$?: Observable<boolean>;
  public isServer!: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private videoStore: VideoStoreService,
    private router: Router,
    private eventDispatcher: EventDispatcherService,
    private webApiService: WebApiService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private title: Title
  ) {}

  public ngOnInit(): void {
    this.isServer = isPlatformServer(this.platformId);
    this.selectStoreData();
    this.initGlobalEventListeners();
    this.setMetaTags();
    this.tryRestoreMiniVideoSetings();
    this.tryRestoreTheme();
    this.openPolicyTermsDialog();
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
    this.title.setTitle(SHELL_META_TAGS.title!);
    this.router.events
      .pipe(
      filter((event: any) => event instanceof NavigationEnd), //eslint-disable-line
        filter((event: NavigationEnd) => event.url === '/'),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.title.setTitle(SHELL_META_TAGS.title!);
      });
  }

  private tryRestoreMiniVideoSetings(): void {
    const localStorageRef = this.webApiService.localStorage;
    const settings = localStorageRef?.getItem(LocalStorageEnum.MINI_WIDEO_SETTINGS);
    if (!settings) {
      return;
    }
    this.videoStore.setIsMiniPlayerMode(true);
    this.videoStore.setMiniPlayerVideo(JSON.parse(settings));
  }

  private tryRestoreTheme(): void {
    const localStorageRef = this.webApiService.localStorage;
    const theme = localStorageRef?.getItem(LocalStorageEnum.SAVED_THEME);
    if (!theme) {
      return;
    }
    this.themeService.setTheme(JSON.parse(theme));
  }

  private openPolicyTermsDialog(): void {
    const sessionStorage = this.webApiService.sessionStorage;
    const isAppPolicyAgreedItem: string | null = sessionStorage?.getItem(SessionStorageEnum.IS_APP_POLICY_AGREED);
    const isAppPolicyAgreed: boolean = coerceBooleanProperty(isAppPolicyAgreedItem);
    if (!environment.production || this.isServer || isAppPolicyAgreed) {
      return;
    }

    const dialogRef = this.dialog.open(PolicyTermsDialogComponent, {
      maxWidth: '90vw',
      width: '670px',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true,
      position: {
        top: '56px',
        bottom: '56px',
      },
    });
    dialogRef.afterClosed().subscribe((consent: boolean) => {
      if (consent) {
        sessionStorage.setItem(SessionStorageEnum.IS_APP_POLICY_AGREED, 'true');
      }
    });
  }
}
