import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Volume } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';

interface SelectionState {
  volumes: Volume[];
  isLoaded: boolean;
}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore
  ) {
    super({ volumes: [], isLoaded: false });
  }

  readonly isLoaded$ = this.select((state) => state.isLoaded);

  readonly navigateToText = this.effect<string>((workId$) =>
    workId$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([workId, lang]) => {
        this.router.navigate([`/${lang}/read/text`, workId]);
        return EMPTY;
      })
    )
  );
}
