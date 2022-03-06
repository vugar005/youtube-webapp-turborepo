import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchVideoComponent } from './watch-video/watch-video.component';

const routes: Routes = [
  {
    path: 'watch',
    component: WatchVideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
