/* eslint-disable */
import { ApplicationConfig, importProvidersFrom, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { ROOT_REDUCERS } from './app/reducers';
import { createApplication } from '@angular/platform-browser';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG } from '@youtube/common-ui';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LIKES_APP_ROUTES } from './app/routes';


const config: ApplicationConfig = {
  providers: [
    provideRouter(LIKES_APP_ROUTES),
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
  customElements.define('likes-app-element', ce);
})();

/* For running app seperately without shell */
// bootstrapApplication(AppComponent, config).catch((err) => console.error(err));
