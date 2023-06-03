import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrowseVideosComponent } from '../../browse-videos/browse-videos.component';
@Component({
  standalone: true,
  selector: 'yt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrowseVideosComponent],
})
export class HomeComponent {}
