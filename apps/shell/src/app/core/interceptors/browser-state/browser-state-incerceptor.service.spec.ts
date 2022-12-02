import { TestBed } from '@angular/core/testing';

import { BrowserStateIncerceptorService } from './browser-state-incerceptor.service';

describe('BrowserStateIncerceptorService', () => {
  let service: BrowserStateIncerceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStateIncerceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
