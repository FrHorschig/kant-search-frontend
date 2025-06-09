import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/de/start', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      {
        path: 'start',
        loadComponent: () =>
          import('../startpage/startpage.component').then(
            (m) => m.StartpageComponent
          ),
      },
      {
        path: 'read',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../../read/selection/selection.component').then(
                (m) => m.SelectionComponent
              ),
          },
          {
            path: 'text/:workCode',
            loadComponent: () =>
              import('../../read/text/text.component').then(
                (m) => m.TextComponent
              ),
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../../search/criteria/criteria.component').then(
                (m) => m.CriteriaComponent
              ),
          },
          {
            path: 'results',
            loadComponent: () =>
              import('../../search/results/results.component').then(
                (m) => m.ResultsComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('../not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];
