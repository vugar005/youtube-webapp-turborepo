import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellNoRenderDirective } from './shell-no-render.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ShellNoRenderDirective],
  exports: [ShellNoRenderDirective],
})
export class ShellNoRenderDirectiveModule {}
