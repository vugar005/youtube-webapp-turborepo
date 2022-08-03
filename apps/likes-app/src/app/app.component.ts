import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APP_CONFIG, youtubeApiServiceFactory, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { HomeComponent } from './home/home.component';
import { Router, RouterModule } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'likes-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() likedVideoList?: string[];

  constructor(private router: Router, private uiStore: UIStoreService, private title: Title) {}

  public ngOnInit(): void {
    this.connectRouter();
    this.setMetaTags();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const likedVideoListChange = changes && changes['likedVideoList'];
    if (likedVideoListChange) {
      const likedVideoListData = likedVideoListChange.currentValue;
      const data = likedVideoListData ? likedVideoListData.split(',') : [];
      this.uiStore.setLikedVideosList({ videoIds: data });
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
    this.title.setTitle(`Liked Videos`);
  }
}
