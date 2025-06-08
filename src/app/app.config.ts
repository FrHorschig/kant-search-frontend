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
import { StartpageComponent } from './app/startpage/startpage.component';
import { NotFoundComponent } from './app/not-found/not-found.component';

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
      { path: 'start', component: StartpageComponent },
      {
        path: 'read',
        loadChildren: () =>
          import('./read/read.module').then((m) => m.ReadModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  // TODO: NotFoundComponent is not showing
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
