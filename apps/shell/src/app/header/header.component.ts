import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryApiService } from '@youtube/common-ui';
import { catchError, EMPTY, Subject, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingsStore } from '../core/services/settings-store/settings-store.service';
import { AppTheme } from '../core/services/theme-service/theme.constants';
import { ThemeService } from '../core/services/theme-service/theme.service';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() readonly toggleMenu = new EventEmitter<void>();
  @Output() readonly toggleAccountMenu = new EventEmitter<void>();
  public searchControl = new FormControl();
  public countryCode?: string;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private videoStore: VideoStoreService,
    private router: Router,
    private settingsStore: SettingsStore,
    private themeService: ThemeService,
    private countryApiService: CountryApiService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
    this.getCountryCode();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onToggleMenu(): void {
    this.toggleMenu.next();
  }

  public onToggleAccountMenu(): void {
    this.toggleAccountMenu.next();
  }

  public onChangeTheme(): void {
    this.settingsStore
      .selectTheme()
      .pipe(take(1))
      .subscribe((theme: AppTheme | null) => {
        if (theme === AppTheme.DARK) {
          this.themeService.setTheme(AppTheme.LIGHT);
        } else {
          this.themeService.setTheme(AppTheme.DARK);
        }
      });
  }

  private listenToEvents(): void {
    this.listenToSearchInput();
  }

  private listenToSearchInput(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value: string) => {
      this.videoStore.setSearchQuery(value);
      this.router.navigate(['']);
    });
  }

  private getCountryCode(): void {
    // load only on production to save api traffic :)
    if (!environment.production || isPlatformServer(this.platformId)) {
      return;
    }
    this.countryApiService
      .getCountryCode()
      .pipe(catchError(() => EMPTY))
      .subscribe((data: string) => {
        this.countryCode = data;
        this.cdr.detectChanges();
      });
  }
}
