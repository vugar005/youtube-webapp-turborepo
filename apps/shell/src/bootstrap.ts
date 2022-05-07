/* eslint-disable */
import { enableProdMode, VERSION } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/** Use below code to support multiple versions of Angular
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

/**
 * Added by angular universal
 */
// if (document.readyState === 'complete') {
//   bootstrap();
// } else {
//   document.addEventListener('DOMContentLoaded', bootstrap);
// }
