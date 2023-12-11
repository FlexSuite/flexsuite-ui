import { Route } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'supri',
    loadChildren: () => import('supri/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'atend',
    loadChildren: () => import('atend/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'rehum',
    loadChildren: () => import('rehum/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'produ',
    loadChildren: () => import('produ/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'logis',
    loadChildren: () => import('logis/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'conti',
    loadChildren: () => import('conti/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'analy',
    loadChildren: () => import('analy/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'fatur',
    loadChildren: () => import('fatur/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'secas',
    loadChildren: () => import('secas/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: HomeComponent,
  }
];
