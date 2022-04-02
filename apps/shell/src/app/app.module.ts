import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { YOUTUBE_SERVICE, APP_CONFIG, youtubeApiServiceFactory, NotFoundPageModule } from '@youtube/common-ui';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyEventsDialogComponent } from './key-events-dialog/key-events-dialog.component';
import { KeyEventsListenerComponent } from './key-events-listener/key-events-listener.component';
import { HeaderModule } from './header/header.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MiniSidebarModule } from './mini-sidebar/mini-sidebar.module';
import { AccountSidebarModule } from './account-sidebar/account-sidebar.module';
import { MiniPlayerModule } from './mini-player/mini-player.module';
import { BrowseVideosModule } from './browse-videos/browse-videos.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, KeyEventsDialogComponent, KeyEventsListenerComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    HeaderModule,
    SidebarModule,
    MiniSidebarModule,
    AccountSidebarModule,
    MiniPlayerModule,
    BrowseVideosModule,

    MatSidenavModule,
    MatDialogModule,

    NotFoundPageModule,
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
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // because we use dynamic angular elements
})
export class AppModule {}
