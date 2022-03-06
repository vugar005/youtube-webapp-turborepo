import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAppWrapperComponent } from './history-app-wrapper.component';

describe('HistoryAppWrapperComponent', () => {
  let component: HistoryAppWrapperComponent;
  let fixture: ComponentFixture<HistoryAppWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryAppWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
