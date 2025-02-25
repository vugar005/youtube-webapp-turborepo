import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyEventsListenerComponent } from './key-events-listener.component';

describe('KeyEventsListenerComponent', () => {
  let component: KeyEventsListenerComponent;
  let fixture: ComponentFixture<KeyEventsListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyEventsListenerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyEventsListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
