import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import {
  YOUTUBE_SERVICE,
  youtubeApiServiceFactory,
  APP_CONFIG,
  EventDispatcherService,
  APP_API_KEY,
} from '@youtube/common-ui';
import { environment } from 'src/environments/environment';
import { APP_KEY } from './app.constants';
import { UIStoreService } from './core/services/ui-store/ui-store.service';
import { WatchVideoComponent } from './watch-video/watch-video.component';

@Component({
  standalone: true,
  selector: 'watch-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule, WatchVideoComponent],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    { provide: APP_CONFIG, useValue: environment },
    {
      provide: APP_API_KEY,
      useValue: APP_KEY,
    },
    EventDispatcherService,
    MatSnackBarModule,
  ],
})
export class AppComponent implements OnInit, OnChanges {
  @Input() likedVideoList?: string[];
  @Input() dislikedVideosList?: string[];

  constructor(private router: Router, private uiStore: UIStoreService) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const likedVideoListChange = changes && changes['likedVideoList'];
    const dislikedVideosListChange = changes && changes['dislikedVideosList'];
    if (likedVideoListChange) {
      const likedVideoListData = likedVideoListChange.currentValue;
      const data = likedVideoListData ? likedVideoListData.split(',') : [];
      this.uiStore.setLikedVideosList({ videoIds: data });
    }

    if (dislikedVideosListChange) {
      const dislikedVideosListData = dislikedVideosListChange.currentValue;
      const data = dislikedVideosListData ? dislikedVideosListData.split(',') : [];
      this.uiStore.setDislikedVideosList({ videoIds: data });
    }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }
}
