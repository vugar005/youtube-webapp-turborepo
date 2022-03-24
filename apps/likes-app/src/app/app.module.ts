import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  APP_CONFIG,
  VideoThumbnailLoaderModule,
  VideoThumbnailModule,
  YoutubeServiceV2,
  YOUTUBE_SERVICE,
} from '@youtube/common-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ROOT_REDUCERS } from './reducers';
import { environment } from '../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    VideoThumbnailModule,
    VideoThumbnailLoaderModule,
    MatDividerModule,
    MatIconModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Youtube Likes App Store',
        })
      : [],
  ],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useClass: YoutubeServiceV2,
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('likes-app-element', ce);
    // <watch-app-element></watch-app-element>
  }
}
