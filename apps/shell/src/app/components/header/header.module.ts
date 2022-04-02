import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { BrandIconModule } from '@youtube/common-ui';
import { SearchBoxMobileModule } from '@youtube/common-ui';
import { SearchBoxModule } from '@youtube/common-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    BrandIconModule,
    SearchBoxModule,
    SearchBoxMobileModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
