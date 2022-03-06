import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageIconComponent } from './not-found-page-icon/not-found-page-icon.component';

@NgModule({
  declarations: [NotFoundPageComponent, NotFoundPageIconComponent],
  exports: [NotFoundPageComponent, NotFoundPageIconComponent],
})
export class NotFoundPageModule {}
