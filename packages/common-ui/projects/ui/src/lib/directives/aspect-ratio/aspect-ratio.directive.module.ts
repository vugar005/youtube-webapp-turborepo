import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectRatioDirective } from './aspect-ratio.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [AspectRatioDirective],
  exports: [AspectRatioDirective],
})
export class AspectRatioDirectiveModule {}
