import { TestBed } from '@angular/core/testing';

import { ServerStateIncerceptorService } from './server-state-incerceptor.service';

describe('ServerStateIncerceptorService', () => {
  let service: ServerStateIncerceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerStateIncerceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
