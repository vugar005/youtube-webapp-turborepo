import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinWidthDirective } from './min-width.directive';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [MinWidthDirective],
  exports: [MinWidthDirective],
})
export class MinWidthDirectiveModule {}
