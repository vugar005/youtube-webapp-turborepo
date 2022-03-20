import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'platform' })
export class SampleService {
  public testVar = 10;

  constructor() {
    console.log('----- Sample Service init -----');
  }
}
