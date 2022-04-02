import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WatchAppWrapperComponent } from './watch-app-wrapper.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: WatchAppWrapperComponent }];

@NgModule({
  declarations: [WatchAppWrapperComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WatchAppWrapperModule {}
