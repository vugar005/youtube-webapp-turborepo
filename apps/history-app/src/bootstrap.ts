/* eslint-disable */
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG } from '@youtube/common-ui';
import { AppComponent } from './app/app.component';
import { ROOT_REDUCERS } from './app/reducers';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { HISTORY_APP_ROUTES } from './app/routes';


const config: ApplicationConfig = {
    providers: [
      provideRouter(HISTORY_APP_ROUTES),
      provideHttpClient(),
      importProvidersFrom(
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreDevtoolsModule.instrument(),
      ),
      {
        provide: YOUTUBE_SERVICE,
        useFactory: youtubeApiServiceFactory,
        deps: [Injector],
      },
      { provide: APP_CONFIG, useValue: environment },
    ]
};

(async function () {
  const envInjector = await createApplication(config);
  const ce = createCustomElement(AppComponent, { injector: envInjector.injector });
  customElements.define('history-app-element', ce);
})();

/* For running app seperately without shell */
// bootstrapApplication(AppComponent, config).catch((err) => console.error(err));