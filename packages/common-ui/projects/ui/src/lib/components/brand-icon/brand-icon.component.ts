import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ytd-brand-icon',
  templateUrl: './brand-icon.component.html',
  styleUrls: ['./brand-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandIconComponent {
  @Input() width?: string | number;
}
