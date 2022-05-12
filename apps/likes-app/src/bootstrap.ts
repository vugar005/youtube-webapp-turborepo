/* eslint-disable */
import { enableProdMode, VERSION } from '@angular/core';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
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
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));

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