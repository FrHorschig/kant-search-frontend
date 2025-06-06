import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';
import { AdvancedOptions } from '../model/search-options';

interface CriteriaState {
  workCodes: string[];
  searchTerms: string;
  options: AdvancedOptions;
}

@Injectable()
export class CriteriaStore extends ComponentStore<CriteriaState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore
  ) {
    super({
      workCodes: [],
      searchTerms: '',
      options: {
        includeHeadings: true,
        includeFootnotes: true,
        includeSummaries: true,
      },
    });
  }

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      filter(() => this.get((state) => this.canSearch(state))),
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([_, lang]) => {
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            workCodes: this.get((state) => state.workCodes.join(',')),
            searchTerms: this.get((state) => state.searchTerms),
            incHead: this.get((state) => state.options.includeHeadings),
            incFn: this.get((state) => state.options.includeFootnotes),
            incSumm: this.get((state) => state.options.includeSummaries),
          },
        });
      })
    )
  );

  readonly putWorkCodes = this.updater((state, workCodes: string[]) => ({
    ...state,
    workCodes,
  }));
  readonly putSearchTerms = this.updater((state, searchTerms: string) => ({
    ...state,
    searchTerms,
  }));
  readonly putOptions = this.updater((state, options: AdvancedOptions) => ({
    ...state,
    options,
  }));

  readonly canSearch$ = this.select((state) => this.canSearch(state));
  readonly searchTerms$ = this.select((state) => state.searchTerms);
  readonly workCodes$ = this.select((state) => state.workCodes);

  private canSearch(state: CriteriaState): boolean {
    return state.workCodes.length > 0 && state.searchTerms.length > 0;
  }
}
