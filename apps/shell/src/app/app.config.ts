import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ApplicationConfig, Injector, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_ROUTES } from './routes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ROOT_REDUCERS } from './reducers';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG } from '@youtube/common-ui';
import { BrowserStateInterceptor } from './core/interceptors/browser-state/browser-state-incerceptor.service';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideClientHydration(),
    {
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    { provide: APP_CONFIG, useValue: environment },
    importProvidersFrom(
      BrowserAnimationsModule,
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
        : []
    ),
  ],
};
