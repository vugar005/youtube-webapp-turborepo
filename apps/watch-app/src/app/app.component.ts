import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';

@Component({
  selector: 'watch-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  @Input() likedVideoList?: string[];
  @Input() dislikedVideosList?: string[];

  constructor(private router: Router, private uiStore: UIStoreService) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const likedVideoListChange = changes && changes['likedVideoList'];
    const dislikedVideosListChange = changes && changes['dislikedVideosList'];
    if (likedVideoListChange) {
      const likedVideoListData = likedVideoListChange.currentValue;
      const data = likedVideoListData ? likedVideoListData.split(',') : [];
      this.uiStore.setLikedVideosList({ videoIds: data });
    }

    if (dislikedVideosListChange) {
      const dislikedVideosListData = dislikedVideosListChange.currentValue;
      const data = dislikedVideosListData ? dislikedVideosListData.split(',') : [];
      this.uiStore.setDislikedVideosList({ videoIds: data });
    }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }
}
