import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchAppWrapperComponent } from './watch-app-wrapper.component';

describe('WatchAppWrapperComponent', () => {
  let component: WatchAppWrapperComponent;
  let fixture: ComponentFixture<WatchAppWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchAppWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchAppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
