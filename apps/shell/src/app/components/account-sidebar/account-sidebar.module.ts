import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSidebarComponent } from './account-sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountSidebarComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule, RouterModule],
  exports: [AccountSidebarComponent],
})
export class AccountSidebarModule {}
