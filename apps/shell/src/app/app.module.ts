import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routing';
import { YOUTUBE_SERVICE, APP_CONFIG, youtubeApiServiceFactory, NotFoundPageComponent } from '@youtube/common-ui';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { KeyEventsDialogComponent } from './components/key-events-dialog/key-events-dialog.component';
import { KeyEventsListenerComponent } from './key-events-listener/key-events-listener.component';
import { AccountSidebarComponent } from './components/account-sidebar/account-sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { MiniSidebarComponent } from './components/mini-sidebar/mini-sidebar.component';
import { BrowseVideosComponent } from './browse-videos/browse-videos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, KeyEventsDialogComponent, KeyEventsListenerComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // standalone
    HeaderComponent,
    SidebarComponent,
    MiniSidebarComponent,
    AccountSidebarComponent,
    MiniPlayerComponent,
    BrowseVideosComponent,
    NotFoundPageComponent,

    MatSidenavModule,
    MatDialogModule,

    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
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
