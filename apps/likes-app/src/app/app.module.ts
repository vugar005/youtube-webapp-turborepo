import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, youtubeApiServiceFactory, YOUTUBE_SERVICE } from '@youtube/common-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { StoreModuleProvider } from './store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    HomeComponent,

    StoreModuleProvider
  ],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useFactory: youtubeApiServiceFactory,
      deps: [Injector],
    },
    { provide: APP_CONFIG, useValue: environment },
  ],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('likes-app-element', ce);
  }
}