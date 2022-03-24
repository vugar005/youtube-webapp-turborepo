import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
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
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';
import { ROOT_REDUCERS } from './reducers';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    VideoThumbnailModule,
    VideoThumbnailLoaderModule,
    MatDividerModule,
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
          name: 'Youtube History App Store',
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
    customElements.define('history-app-element', ce);
    // <history-app-element></history-app-element>
  }
}
