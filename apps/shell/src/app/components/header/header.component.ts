import { CommonModule, isPlatformServer } from '@angular/common';
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
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Router, RouterModule } from '@angular/router';
import {
  BrandIconComponent,
  CountryApiService,
  MaxWidthDirective,
  MinWidthDirective,
  SearchBoxComponent,
  SearchBoxMobileComponent,
} from '@youtube/common-ui';
import { catchError, EMPTY, Subject, take, takeUntil } from 'rxjs';
import { DEFAULT_SEARCH_VALUE } from 'src/app/app.constants';
import { SettingsStore } from '../../core/services/settings-store/settings-store.service';
import { AppTheme } from '../../core/services/theme-service/theme.constants';
import { ThemeService } from '../../core/services/theme-service/theme.service';
import { VideoStoreService } from '../../core/services/video-store/video-store.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    BrandIconComponent,
    MinWidthDirective,
    MaxWidthDirective,
    SearchBoxComponent,
    SearchBoxMobileComponent,
    ReactiveFormsModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() readonly toggleMenu = new EventEmitter<void>();
  @Output() readonly toggleAccountMenu = new EventEmitter<void>();
  public searchControl = new UntypedFormControl();
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
      const searchValue = value || DEFAULT_SEARCH_VALUE;
      this.videoStore.setSearchQuery(searchValue);
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
