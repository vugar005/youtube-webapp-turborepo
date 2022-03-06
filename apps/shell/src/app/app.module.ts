import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import {
  SearchBoxModule,
  VideoPlayerModule,
  VideoThumbnailLoaderModule,
  VideoThumbnailModule,
  YoutubeServiceV2,
  YOUTUBE_API_KEY,
  YOUTUBE_SERVICE,
  BrandIconModule,
  NotFoundPageModule,
  APP_CONFIG,
  SearchBoxMobileModule,
} from '@youtube/common-ui';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './reducers';
import { BrowseVideosComponent } from './browse-videos/browse-videos.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniSidebarComponent } from './mini-sidebar/mini-sidebar.component';
import { WatchAppWrapperComponent } from './watch-app-wrapper/watch-app-wrapper.component';
import { LikesAppWrapperComponent } from './likes-app-wrapper/likes-app-wrapper.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { MiniPlayerComponent } from './mini-player/mini-player.component';
import { HistoryAppWrapperComponent } from './history-app-wrapper/history-app-wrapper.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyEventsDialogComponent } from './key-events-dialog/key-events-dialog.component';
import { KeyEventsListenerComponent } from './key-events-listener/key-events-listener.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    BrowseVideosComponent,
    MiniSidebarComponent,
    WatchAppWrapperComponent,
    LikesAppWrapperComponent,
    AccountSidebarComponent,
    MiniPlayerComponent,
    HistoryAppWrapperComponent,
    KeyEventsDialogComponent,
    KeyEventsListenerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    BrandIconModule,
    VideoPlayerModule,
    VideoThumbnailModule,
    NotFoundPageModule,
    MatDialogModule,
    SearchBoxModule,
    MatMenuModule,
    AppRoutingModule,
    ReactiveFormsModule,
    VideoThumbnailLoaderModule,
    SearchBoxMobileModule,
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
          name: 'Youtube Shell Store',
        })
      : [],
  ],
  providers: [
    {
      provide: YOUTUBE_API_KEY,
      useValue: environment.youtubeApiKey,
    },
    {
      provide: YOUTUBE_SERVICE,
      useClass: YoutubeServiceV2,
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // because we use dynamic angular elements
})
export class AppModule {}
