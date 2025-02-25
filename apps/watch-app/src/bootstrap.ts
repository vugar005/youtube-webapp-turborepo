/* eslint-disable */
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, Injector } from '@angular/core';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { createApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG, APP_API_KEY, EventDispatcherService } from '@youtube/common-ui';

import { AppComponent } from './app/app.component';
import { APP_KEY } from './app/app.constants';
import { ROOT_REDUCERS } from './app/reducers';
import { environment } from './environments/environment';
import { WATCH_APP_ROUTES } from './app/routes';


const config: ApplicationConfig = {
  providers: [
    provideRouter(WATCH_APP_ROUTES),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      StoreModule.forRoot(ROOT_REDUCERS),
      StoreDevtoolsModule.instrument(),
      MatSnackBarModule
    ),
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
  ]
};

(async function () {
  const envInjector = await createApplication(config);
  const ce = createCustomElement(AppComponent, { injector: envInjector.injector });
  customElements.define('watch-app-element', ce);
})();


/* For running app seperately without shell */
// bootstrapApplication(AppComponent, config).catch((err) => console.error(err));