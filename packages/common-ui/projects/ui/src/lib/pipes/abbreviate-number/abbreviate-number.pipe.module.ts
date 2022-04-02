import { NgModule } from '@angular/core';
import { AbbreviateNumber } from './abbreviate-number.pipe';
@NgModule({
  declarations: [AbbreviateNumber],
  exports: [AbbreviateNumber],
})
export class AbbreviateNumberPipeModule {}
