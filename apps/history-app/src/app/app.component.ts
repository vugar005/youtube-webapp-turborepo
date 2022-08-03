import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG } from '@youtube/common-ui';
import { environment } from 'src/environments/environment';
import { UIStoreService } from './core/services/ui-store/ui-store.service';
import { HomeComponent } from './home/home.component';

@Component({
  standalone: true,
  selector: 'history-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule, HomeComponent],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
})
export class AppComponent implements OnInit, OnChanges {
  @Input() watchedVideoList?: string[];
  @Input() isWatchHistoryEnabled?: boolean;

  constructor(private router: Router, private uiStore: UIStoreService, private title: Title) {}

  public ngOnInit(): void {
    this.connectRouter();
    this.setMetaTags();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const watchedVideosListChange = changes && changes['watchedVideoList'];
    const isWatchHistoryEnabledChange = changes && changes['isWatchHistoryEnabled'];
    if (watchedVideosListChange) {
      const watchedVideosListData = watchedVideosListChange.currentValue;
      const data = watchedVideosListData ? watchedVideosListData.split(',') : [];
      this.uiStore.setWatchedVideosList({ videoIds: data });
    }
    if (isWatchHistoryEnabledChange) {
      const isWatchHistoryEnabledValue = coerceBooleanProperty(isWatchHistoryEnabledChange.currentValue);
      this.uiStore.setIsWatchHistoryEnabled({ isEnabled: isWatchHistoryEnabledValue });
    }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }

  private setMetaTags(): void {
    this.title.setTitle(`Watched Videos`);
  }
}
