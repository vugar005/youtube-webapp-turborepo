import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageIconComponent } from './not-found-page-icon.component';

describe('NotFoundPageIconComponent', () => {
  let component: NotFoundPageIconComponent;
  let fixture: ComponentFixture<NotFoundPageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundPageIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
