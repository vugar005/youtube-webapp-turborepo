import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDispatcherService, HistoryAppEvent } from '@youtube/common-ui';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountStoreService } from '../core/services/account-store/account-store.service';
import { registry } from '../registry';

@Component({
  selector: 'yt-history-app-wrapper',
  templateUrl: './history-app-wrapper.component.html',
  styleUrls: ['./history-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryAppWrapperComponent implements OnInit, OnDestroy {
  public isElementLoaded?: boolean;
  public watchedVideos$?: Observable<string[]>;
  public isWatchHistoryEnabled$?: Observable<boolean>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private accountStore: AccountStoreService,
    private eventDispatcher: EventDispatcherService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadElement();
    this.initStoreData();
    this.initHistoryhAppListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public loadElement(): void {
    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = registry[importName];
    importFn()
      .then(() => {
        this.isElementLoaded = true;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => console.error(`error loading ${elementName}:`, err));
  }

  private initStoreData(): void {
    this.watchedVideos$ = this.accountStore.selectWatchedVideos();
    this.isWatchHistoryEnabled$ = this.accountStore.selectIsWatchHistoryEnabled();
  }

  private initHistoryhAppListeners(): void {
    this.eventDispatcher
      .on(HistoryAppEvent.CLEAR_WATCH_HISTORY)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.accountStore.clearWatchHistory();
      });

    this.eventDispatcher
      .on(HistoryAppEvent.TOGGLE_IS_WATCH_HISTORY_ENABLED)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const isActive = event.detail.isActive;
        this.accountStore.toggleIsWatchHistoryEnabled({ isActive });
      });
  }
}
