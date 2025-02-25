import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NotFoundPageIconComponent } from './not-found-page-icon/not-found-page-icon.component';

@Component({
  standalone: true,
  selector: 'ytd-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotFoundPageIconComponent],
})
export class NotFoundPageComponent {}
