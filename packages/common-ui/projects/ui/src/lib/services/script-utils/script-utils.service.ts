import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IScriptConfig } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ScriptUtilsService {
  public loadScript(config: IScriptConfig): Observable<boolean | ErrorEvent> {
    const { src } = config;
    const scriptLoaderSubject$ = new ReplaySubject<boolean>();
    const isScriptExist = document.querySelectorAll(`script[src="${src}"]`)?.length;
    if (isScriptExist) {
      scriptLoaderSubject$.next(true);
      scriptLoaderSubject$.complete();
    } else {
      const script = this.generateScriptElement(config);
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        scriptLoaderSubject$.next(true);
        scriptLoaderSubject$.complete();
      });

      script.addEventListener('error', (er) => {
        scriptLoaderSubject$.error(er);
        scriptLoaderSubject$.complete();
      });
    }
    return scriptLoaderSubject$;
  }

  private generateScriptElement(config: IScriptConfig): HTMLScriptElement {
    const { src, isAsync, isDefer } = config;
    const script = document.createElement('script');
    script.src = src;
    if (isAsync === true) {
      script.setAttribute('async', '');
    }
    if (isDefer === true) {
      script.setAttribute('defer', '');
    }
    return script;
  }
}
