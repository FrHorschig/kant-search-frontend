import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap, tap } from 'rxjs';

interface LanguageState {
  available: string[];
  current: string;
}

const defaultLang = 'de';

@Injectable({ providedIn: 'root' })
export class LanguageStore extends ComponentStore<LanguageState> {
  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {
    super({ available: ['de', 'en'], current: defaultLang });
    this.subscribeRouterEvents();
  }

  readonly updateCurrentLanguage = this.updater(
    (state, currentLanguage: string) => ({
      ...state,
      current: currentLanguage,
    })
  );

  readonly availableLanguages$ = this.select((state) => state.available);
  readonly currentLanguage$ = this.select((state) => state.current);

  private subscribeRouterEvents() {
    this.effect(() =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          return this.router.routerState.root;
        }),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.params),
        tap((params) => {
          const lang = params['lang'];
          if (lang && this.get((state) => state.available).includes(lang)) {
            this.translateService.use(lang);
            this.updateCurrentLanguage(lang);
          } else {
            this.router.navigate(['/not-found']);
          }
        })
      )
    );
  }
}
