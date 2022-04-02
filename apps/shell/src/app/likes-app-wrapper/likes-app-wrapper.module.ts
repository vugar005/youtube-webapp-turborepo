import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LikesAppWrapperComponent } from './likes-app-wrapper.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: LikesAppWrapperComponent }];

@NgModule({
  declarations: [LikesAppWrapperComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LikesAppWrapperModule {}
