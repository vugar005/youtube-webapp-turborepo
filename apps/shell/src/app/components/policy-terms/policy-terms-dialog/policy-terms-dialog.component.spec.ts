import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTermsDialogComponent } from './policy-terms-dialog.component';

describe('PolicyTermsDialogComponent', () => {
  let component: PolicyTermsDialogComponent;
  let fixture: ComponentFixture<PolicyTermsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyTermsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyTermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
