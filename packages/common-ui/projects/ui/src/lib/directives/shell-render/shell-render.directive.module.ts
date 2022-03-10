import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRenderDirective } from './shell-render.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ShellRenderDirective],
  exports: [ShellRenderDirective],
})
export class ShellRenderDirectiveModule {}
