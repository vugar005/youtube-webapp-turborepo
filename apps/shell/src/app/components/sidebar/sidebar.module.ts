import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BrandIconComponent } from '@youtube/common-ui';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatDividerModule, BrandIconComponent, MatButtonModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
