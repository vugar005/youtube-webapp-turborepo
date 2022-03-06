import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyEventsDialogComponent } from './key-events-dialog.component';

describe('KeyEventsDialogComponent', () => {
  let component: KeyEventsDialogComponent;
  let fixture: ComponentFixture<KeyEventsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyEventsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
