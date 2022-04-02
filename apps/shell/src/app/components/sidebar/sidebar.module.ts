import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { BrandIconModule } from '@youtube/common-ui';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatDividerModule, BrandIconModule, MatButtonModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
