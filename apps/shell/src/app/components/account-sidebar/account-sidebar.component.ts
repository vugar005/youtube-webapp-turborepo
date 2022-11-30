import { Component, ChangeDetectionStrategy, VERSION, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppTheme } from '../../core/services/theme-service/theme.constants';
import { ThemeService } from '../../core/services/theme-service/theme.service';
import { KeyEventsDialogComponent } from '../key-events-dialog/key-events-dialog.component';
import { LocalStorageEnum, WebApiService, YoutubeApiServiceType } from '@youtube/common-ui';
import { API_SELECT_OPTIONS } from './account-sidebar.constants';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'yt-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule, RouterModule, KeyEventsDialogComponent],
})
export class AccountSidebarComponent implements OnInit {
  public readonly version = VERSION.full;
  public readonly appTheme = AppTheme;
  public readonly apiSelectOptions = API_SELECT_OPTIONS;
  public readonly youtubeApiServiceType = YoutubeApiServiceType;
  public selectedApiService!: YoutubeApiServiceType;

  constructor(private themeService: ThemeService, private dialog: MatDialog, private webapiService: WebApiService) {}

  public ngOnInit(): void {
    this.setSelectedApiService();
  }

  public onChangeTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }

  public onChangeAPIService(apiService: YoutubeApiServiceType): void {
    const sessionStorageRef = this.webapiService.sessionStorage;
    const locationRef = this.webapiService.location;
    sessionStorageRef?.setItem(LocalStorageEnum.SELECTED_API_SERVICE, apiService);
    locationRef?.reload();
  }

  public onShowKeyEventsDialog(): void {
    this.dialog.open(KeyEventsDialogComponent, {
      width: 'calc(100% - 48px)',
      maxWidth: 'auto',
      position: { top: '24px', left: '24px' },
    });
  }

  private setSelectedApiService(): void {
    const sessionStorageRef = this.webapiService.sessionStorage;
    const savedApiService = sessionStorageRef?.getItem(LocalStorageEnum.SELECTED_API_SERVICE) as YoutubeApiServiceType;
    this.selectedApiService = savedApiService || YoutubeApiServiceType.EXTERNAL_API_V2;
  }
}
