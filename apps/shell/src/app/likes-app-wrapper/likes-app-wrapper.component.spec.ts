import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesAppWrapperComponent } from './likes-app-wrapper.component';

describe('LikesAppWrapperComponent', () => {
  let component: LikesAppWrapperComponent;
  let fixture: ComponentFixture<LikesAppWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesAppWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesAppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
