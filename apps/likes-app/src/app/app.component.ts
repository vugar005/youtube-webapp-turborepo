import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';

@Component({
  selector: 'likes-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  @Input() likedVideoList?: string[];

  constructor(private router: Router, private uiStore: UIStoreService, private title: Title) {}

  public ngOnInit(): void {
    this.connectRouter();
    this.setMetaTags();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const likedVideoListChange = changes && changes['likedVideoList'];
    if (likedVideoListChange) {
      const likedVideoListData = likedVideoListChange.currentValue;
      const data = likedVideoListData ? likedVideoListData.split(',') : [];
      this.uiStore.setLikedVideosList({ videoIds: data });
    }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }

  private setMetaTags(): void {
    this.title.setTitle(`Liked Videos`);
  }
}
