import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniSidebarComponent } from './mini-sidebar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MiniSidebarComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [MiniSidebarComponent],
})
export class MiniSidebarModule {}
