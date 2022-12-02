import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerStateInterceptor } from './core/interceptors/server-state/server-state-incerceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
