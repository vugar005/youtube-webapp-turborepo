import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
