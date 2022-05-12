import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { APP_CONFIG, youtubeApiServiceFactory, YOUTUBE_SERVICE } from '@youtube/common-ui';

import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';
import { StoreModuleProvider } from './store.module';
@Component({
  standalone: true,
  selector: 'likes-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppRoutingModule,
    HttpClientModule,

    HomeComponent,

    StoreModuleProvider,
  ],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
})
export class AppComponent implements OnInit, OnChanges, DoBootstrap {
  @Input() likedVideoList?: string[];

  constructor(
    private injector: Injector,
    private router: Router, private uiStore: UIStoreService, private title: Title) {}

  public ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('likes-app-element', ce);
  }

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
