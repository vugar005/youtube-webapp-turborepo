import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@youtube/common-ui';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'watch',
    loadChildren: () => import('./watch-app-wrapper/watch-app-wrapper.module').then((m) => m.WatchAppWrapperModule),
    data: { importName: 'watchApp', elementName: 'watch-app-element' },
  },
  {
    path: 'liked',
    loadChildren: () => import('./likes-app-wrapper/likes-app-wrapper.module').then((m) => m.LikesAppWrapperModule),
    data: { importName: 'likesApp', elementName: 'likes-app-element' },
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./history-app-wrapper/history-app-wrapper.module').then((m) => m.HistoryAppWrapperModule),
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
