import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@youtube/common-ui';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'watch',
    loadComponent: () =>
      import('./watch-app-wrapper/watch-app-wrapper.component').then((m) => m.WatchAppWrapperComponent),
    data: { importName: 'watchApp', elementName: 'watch-app-element' },
  },
  {
    path: 'liked',
    loadComponent: () =>
      import('./likes-app-wrapper/likes-app-wrapper.component').then((m) => m.LikesAppWrapperComponent),
    data: { importName: 'likesApp', elementName: 'likes-app-element' },
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history-app-wrapper/history-app-wrapper.component').then((m) => m.HistoryAppWrapperComponent),
    data: { importName: 'historyApp', elementName: 'history-app-element' },
  },
  {
    path: 'policy-terms',
    loadChildren: () => import('./components/policy-terms/policy-terms.module').then((m) => m.PolicyTermsModule),
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
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
