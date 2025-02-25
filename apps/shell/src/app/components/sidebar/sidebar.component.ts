import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BrandIconComponent } from '@youtube/common-ui';
import { SIDEBAR_NAV_ENDPOINTS } from './sidebar.constants';

@Component({
  standalone: true,
  selector: 'yt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, RouterModule, MatDividerModule, BrandIconComponent, MatButtonModule],
})
export class SidebarComponent {
  @Output() readonly toggleMenu = new EventEmitter<void>();

  public readonly endpointLinks = SIDEBAR_NAV_ENDPOINTS;

  public onToggleMenu(): void {
    this.toggleMenu.next();
  }
}
