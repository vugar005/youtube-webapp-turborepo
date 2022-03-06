import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThumbnailLoaderComponent } from './video-thumbnail-loader.component';

describe('VideoThumbnailLoaderComponent', () => {
  let component: VideoThumbnailLoaderComponent;
  let fixture: ComponentFixture<VideoThumbnailLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoThumbnailLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoThumbnailLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
