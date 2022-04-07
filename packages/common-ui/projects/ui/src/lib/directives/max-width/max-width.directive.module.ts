import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaxWidthDirective } from './max-width.directive';

@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [MaxWidthDirective],
  exports: [MaxWidthDirective],
})
export class MaxWidthDirectiveModule {}
