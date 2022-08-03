/* eslint-disable */
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { YOUTUBE_SERVICE, youtubeApiServiceFactory, APP_CONFIG } from '@youtube/common-ui';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routing';
import { ROOT_REDUCERS } from './app/reducers';
import { environment } from './environments/environment';

/** Do NOT enable production mode on remote apps.
 * Because it is already going to be enabled on SHELL
*/
// if (environment.production) {
//   enableProdMode();
// }

// ngModule MODE
// platformBrowser().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// STANDALONE MODE

(async function () {
  const envInjector = await createApplication({
    providers: [
      importProvidersFrom(
        AppRoutingModule,
        HttpClientModule,
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
  });
  const ce = createCustomElement(AppComponent, { injector: envInjector.injector });
  customElements.define('history-app-element', ce);
})();

/** You can use below code to support multiple versions of Angular
 *  Each different version Angular app should have different plattform instance
 *  In our case we use monorepo(same angular version) so no need to check plattform.
*/

// const ngVersion = VERSION.full;
// (window as any).plattform = (window as any).plattform || {};
// let platform = (window as any).plattform[ngVersion];
// if (!platform) {
//   platform = platformBrowser();
//   (window as any).plattform[ngVersion] = platform;
// }
// platform.bootstrapModule(AppModule).catch((err: any) => console.error(err));

/** Or use ready bootstrap util function from @angular-architects/module-federation-tools package
 *  LINK: https://www.npmjs.com/package/@angular-architects/module-federation-tools#helper-for-angular
*/