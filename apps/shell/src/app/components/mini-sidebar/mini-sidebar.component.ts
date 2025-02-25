import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MINI_SIDEBAR_NAV_ENDPOINTS } from './mini-sidebar.constants';

@Component({
  standalone: true,
  selector: 'yt-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class MiniSidebarComponent {
  public readonly endpoints = MINI_SIDEBAR_NAV_ENDPOINTS;
}
