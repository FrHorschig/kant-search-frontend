import {
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApiModule } from '@frhorschig/kant-search-api';
import { UrlLoaderService } from './common/service/url-loader.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function loadBackendUrl(urlLoader: UrlLoaderService) {
  return urlLoader.adjustBasePath();
}

const routes: Routes = [
  { path: '', redirectTo: '/de/start', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      {
        path: 'start',
        loadComponent: () =>
          import('./app/startpage/startpage.component').then(
            (m) => m.StartpageComponent
          ),
      },
      {
        path: 'read',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./read/selection/selection.component').then(
                (m) => m.SelectionComponent
              ),
          },
          {
            path: 'text/:workCode',
            loadComponent: () =>
              import('./read/text/text.component').then((m) => m.TextComponent),
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./search/criteria/criteria.component').then(
                (m) => m.CriteriaComponent
              ),
          },
          {
            path: 'results',
            loadComponent: () =>
              import('./search/results/results.component').then(
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
      import('./app/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];

export const appProviders = [
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  provideAnimations(),
  importProvidersFrom(ApiModule),
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ),
  provideAppInitializer(() => {
    const urlLoader = inject(UrlLoaderService);
    return urlLoader.adjustBasePath();
  }),
];
