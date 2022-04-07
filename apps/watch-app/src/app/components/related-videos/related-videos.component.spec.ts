import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedVideosComponent } from './related-videos.component';

describe('RelatedVideosComponent', () => {
  let component: RelatedVideosComponent;
  let fixture: ComponentFixture<RelatedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedVideosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
