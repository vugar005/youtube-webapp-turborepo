import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserOnlyDirective } from './browser-only.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [BrowserOnlyDirective],
  exports: [BrowserOnlyDirective],
})
export class BrowserOnlyDirectiveModule {}
