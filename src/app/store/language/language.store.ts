import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, filter, firstValueFrom, map, mergeMap, tap } from 'rxjs';

interface LanguageState {
  available: string[];
  current: string;
  ready: boolean;
}

const defaultLang = 'de';

@Injectable({ providedIn: 'root' })
export class LanguageStore extends ComponentStore<LanguageState> {
  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {
    super({ available: ['de', 'en'], current: defaultLang, ready: false });
    this.subscribeRouterEvents();
  }

  readonly availableLanguages$ = this.select((state) => state.available);
  readonly currentLanguage$ = this.select((state) => state.current);
  readonly ready$ = this.select((state) => state.ready);

  updateCurrentLanguage(lang: string) {
    let currentPathParts = this.router.url.split('/').filter((p) => p);
    currentPathParts[0] = lang;
    this.router.navigateByUrl(currentPathParts.join('/'));
  }

  init(): Promise<void> {
    const langFromUrl = this.router.url.split('/').filter((p) => p)[0];
    const lang = this.get((state) => state.available).includes(langFromUrl)
      ? langFromUrl
      : defaultLang;
    return firstValueFrom(this.setLanguage(lang));
  }

  private subscribeRouterEvents() {
    this.effect(() =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.params),
        mergeMap((params) => this.setLanguage(params['lang']))
      )
    );
  }

  private setLanguage(lang: string) {
    this.patchState({ ready: false });
    if (!this.get((state) => state.available).includes(lang)) {
      this.router.navigate(['/not-found']);
      return EMPTY;
    }
    return this.translateService
      .use(lang)
      .pipe(tap(() => this.patchState({ current: lang, ready: true })));
  }
}
