import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';

interface TocState {}

@Injectable()
export class TocStore extends ComponentStore<TocState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore
  ) {
    super({});
  }

  readonly navigateToText = this.effect<number>((workId$) =>
    workId$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([workId, lang]) => {
        this.router.navigate([`/${lang}/read/text`, workId]);
        return EMPTY;
      })
    )
  );
}
