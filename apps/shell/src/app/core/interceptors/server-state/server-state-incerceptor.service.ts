import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status === 200) {
          const key: StateKey<string> = makeStateKey(req.url);
          this.transferState.set(key, event.body);
        }
      })
    );
  }
}
