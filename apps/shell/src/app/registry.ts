import { loadRemoteModule } from '@angular-architects/module-federation';
import { APP_VERSION } from 'src/app.constants';
import { environment } from '../environments/environment';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const registry: any = {
  watchApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.remotesUrl.watchApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components',
    }),
  likesApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.remotesUrl.likesApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components',
    }),
  historyApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.remotesUrl.historyApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components',
    }),
};
