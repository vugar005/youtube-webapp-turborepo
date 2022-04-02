import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSecondaryInfoComponent } from './video-secondary-info.component';

describe('VideoSecondaryInfoComponent', () => {
  let component: VideoSecondaryInfoComponent;
  let fixture: ComponentFixture<VideoSecondaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoSecondaryInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSecondaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
