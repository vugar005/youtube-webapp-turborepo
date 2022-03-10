import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerOnlyDirective } from './server-only.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ServerOnlyDirective],
  exports: [ServerOnlyDirective],
})
export class ServerOnlyDirectiveModule {}
