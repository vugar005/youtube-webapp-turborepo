import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { WebApiService } from '../web-api';
import { CustomEventConfig } from './event-dispatcher.constants';

@Injectable({
  providedIn: 'root',
})
export class EventDispatcherService {
  // eslint-disable-next-line
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private webApiService: WebApiService) {}

  public dispatchEvent(eventName: string, config?: CustomEventConfig): void {
    const eventNameUnique = eventName.trim();
    if (isPlatformBrowser(this.platformId)) {
      const event = new CustomEvent(eventNameUnique, config);
      window.dispatchEvent(event);
    }
  }

  public on(eventName: string): Observable<Partial<CustomEvent>> {
    return fromEvent(this.webApiService.window, eventName.trim());
  }
}
