import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path:'dashboard',
    loadComponent: () => import('./dashboard/dashboard'),
    children: [
      {
        path: 'change-detection',
        title: 'Change Detection',
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection'),

      },
      {
        path: 'control-flow',
        title: 'Control Flow',
        loadComponent: () => import('./dashboard/pages/control-flow/control-flow'),

      },
      {
        path: 'defer-views',
        title: 'Defer Views',
        loadComponent: () => import('./dashboard/pages/defer-views/defer-views'),

      },
      {
        path: 'user:id',
        title: 'User',
        loadComponent: () => import('./dashboard/pages/user/user'),

      },
      {
        path: 'user-list',
        title: 'user-list',
        loadComponent: () => import('./dashboard/pages/users/users'),

      },
      {
        path: 'view-transition',
        title: 'View Transition',
        loadComponent: () => import('./dashboard/pages/view-transition/view-transition'),

      },
      {
        path:'',
        redirectTo: 'control-flow',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'

  }
];
