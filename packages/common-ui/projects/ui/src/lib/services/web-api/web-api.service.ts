import { Inject, Injectable } from '@angular/core';
import { WINDOW, LOCATION, LOCAL_STORAGE } from '@ng-web-apis/common';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WebApiService {
  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    @Inject(LOCATION) private readonly locationRef: Location,
    @Inject(LOCAL_STORAGE) private readonly localStorageRef: Storage,
    @Inject(DOCUMENT) private readonly documentRef: Document
  ) {}

  public get window(): Window {
    return this.windowRef;
  }

  public get document(): Document {
    return this.documentRef;
  }

  public get location(): Location {
    return this.locationRef;
  }

  public get localStorage(): Storage {
    return this.localStorageRef;
  }
}
