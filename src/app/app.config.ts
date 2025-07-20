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
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LanguageStore } from './common/store/language.store';
import { routes } from './app/config/routes';
import { ConfigStore } from './app/config/config.store';

export const appProviders = [
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  provideAnimations(),
  importProvidersFrom(ApiModule),
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    })
  ),
  provideAppInitializer(() => {
    const configStore = inject(ConfigStore);
    const langStore = inject(LanguageStore);
    return (async () => {
      await configStore.init();
      await langStore.init();
    })();
  }),
];
