import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseVideosComponent } from './browse-videos.component';

describe('BrowseVideosComponent', () => {
  let component: BrowseVideosComponent;
  let fixture: ComponentFixture<BrowseVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseVideosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
