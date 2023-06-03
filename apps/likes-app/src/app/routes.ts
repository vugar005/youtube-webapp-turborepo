import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const LIKES_APP_ROUTES: Routes = [
  {
    path: 'liked',
    component: HomeComponent,
  },
];
