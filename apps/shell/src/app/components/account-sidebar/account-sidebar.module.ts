import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSidebarComponent } from './account-sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AccountSidebarComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule],
  exports: [AccountSidebarComponent],
})
export class AccountSidebarModule {}
