import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@youtube/common-ui';
import { HistoryAppWrapperComponent } from './history-app-wrapper/history-app-wrapper.component';
import { HomeComponent } from './home/home.component';
import { LikesAppWrapperComponent } from './likes-app-wrapper/likes-app-wrapper.component';
import { WatchAppWrapperComponent } from './watch-app-wrapper/watch-app-wrapper.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'watch',
    component: WatchAppWrapperComponent,
    data: { importName: 'watchApp', elementName: 'watch-app-element' },
  },
  {
    path: 'liked',
    component: LikesAppWrapperComponent,
    data: { importName: 'likesApp', elementName: 'likes-app-element' },
  },
  {
    path: 'history',
    component: HistoryAppWrapperComponent,
    data: { importName: 'historyApp', elementName: 'history-app-element' },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
