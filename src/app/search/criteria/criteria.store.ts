import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';
import { AdvancedOptions, ResultSort } from '../model/search-options';

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
        sort: ResultSort.AaOrder,
        withStemming: true,
        includeFootnotes: true,
        includeHeadings: false,
        includeSummaries: false,
      },
    });
  }

  readonly canSearch$ = this.select((state) => this.canSearch(state));
  readonly searchTerms$ = this.select((state) => state.searchTerms);
  readonly workCodes$ = this.select((state) => state.workCodes);
  readonly options$ = this.select((state) => state.options);

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      filter(() => this.get((state) => this.canSearch(state))),
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([_, lang]) => {
        const state = this.get();
        const queryParams: Params = {
          searchTerms: state.searchTerms,
          workCodes: state.workCodes.join(','),
        };
        if (state.options.sort === ResultSort.Year) {
          queryParams['sort'] = ResultSort.Year;
        }
        if (state.options.withStemming) {
          queryParams['stems'] = true;
        }
        if (state.options.includeFootnotes) {
          queryParams['incFn'] = true;
        }
        if (state.options.includeHeadings) {
          queryParams['incHead'] = true;
        }
        if (state.options.includeSummaries) {
          queryParams['incSumm'] = true;
        }
        this.router.navigate([`/${lang}/search/results`], {
          queryParams,
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

  private canSearch(state: CriteriaState): boolean {
    return state.workCodes.length > 0 && state.searchTerms.length > 0;
  }
}
