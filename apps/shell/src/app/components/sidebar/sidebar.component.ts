import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SIDEBAR_NAV_ENDPOINTS } from './sidebar.constants';

@Component({
  selector: 'yt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Output() readonly toggleMenu = new EventEmitter<void>();

  public readonly endpointLinks = SIDEBAR_NAV_ENDPOINTS;

  public onToggleMenu(): void {
    this.toggleMenu.next();
  }
}
