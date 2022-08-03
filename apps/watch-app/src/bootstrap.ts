/* eslint-disable */
import { importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { createApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routing';
import { ROOT_REDUCERS } from './app/reducers';

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

(async function() {
  const envInjector = await createApplication({
      providers: [
      importProvidersFrom(
      AppRoutingModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(ROOT_REDUCERS),
      StoreDevtoolsModule.instrument(),
      MatSnackBarModule
    )
  ]
  });
  const ce = createCustomElement(AppComponent, {injector: envInjector.injector});
  customElements.define('watch-app-element', ce);
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