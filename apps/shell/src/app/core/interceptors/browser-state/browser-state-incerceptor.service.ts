import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const key: StateKey<string> = makeStateKey(req.url);
      const cachedResponse: any = this.transferState.get(key, null);
      if (cachedResponse) {
        this.transferState.remove(key);
        const response = new HttpResponse({ body: cachedResponse, status: 200 });
        return of(response);
      }
    }

    return next.handle(req);
  }
}
