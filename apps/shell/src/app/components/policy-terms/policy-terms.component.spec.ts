import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTermsComponent } from './policy-terms.component';

describe('PolicyTermsComponent', () => {
  let component: PolicyTermsComponent;
  let fixture: ComponentFixture<PolicyTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyTermsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
