import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppTheme } from '../core/services/theme-service/theme.constants';
import { ThemeService } from '../core/services/theme-service/theme.service';
import { KeyEventsDialogComponent } from '../key-events-dialog/key-events-dialog.component';

@Component({
  selector: 'yt-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidebarComponent {
  public readonly version = VERSION.full;
  public readonly appTheme = AppTheme;

  constructor(private themeService: ThemeService, private dialog: MatDialog) {}

  public onChangeTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }

  public onShowKeyEventsDialog(): void {
    this.dialog.open(KeyEventsDialogComponent, {
      width: 'calc(100% - 48px)',
      maxWidth: 'auto',
      position: { top: '24px', left: '24px' },
    });
  }
}
