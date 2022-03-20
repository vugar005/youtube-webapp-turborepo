import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ytd-brand-icon',
  templateUrl: './brand-icon.component.html',
  styleUrls: ['./brand-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandIconComponent {
  @Input() width?: string | number;
}
