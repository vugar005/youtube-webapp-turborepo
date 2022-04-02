import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoryAppWrapperComponent } from './history-app-wrapper.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: HistoryAppWrapperComponent }];

@NgModule({
  declarations: [HistoryAppWrapperComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistoryAppWrapperModule {}
