import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchScope, Work } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';
import { SearchOptions } from '../model/search-output';
import { SelectionGroup } from '../model/selection-group';

interface CriteriaState {
  workIds: string[];
  selectionGroup: SelectionGroup;
  searchString: string;
  options: SearchOptions;
}

@Injectable()
export class CriteriaStore extends ComponentStore<CriteriaState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore
  ) {
    super({
      workIds: [],
      selectionGroup: SelectionGroup.ALL,
      searchString: '',
      options: { scope: SearchScope.Paragraph },
    });
  }

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      filter(() => this.get((state) => this.canSearch(state))),
      withLatestFrom(this.langStore.currentLanguage$),
      tap((lang) => {
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            workIds: this.get((state) => state.workIds),
            searchString: this.get((state) => state.searchString),
            scope: this.get((state) => state.options.scope),
          },
        });
      })
    )
  );

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
  }));
  readonly putSelectionGroup = this.updater((state, group: SelectionGroup) => ({
    ...state,
    selectionGroup: group,
  }));
  readonly putSearchString = this.updater((state, searchString: string) => ({
    ...state,
    searchString: searchString,
  }));
  readonly putOptions = this.updater((state, options: SearchOptions) => ({
    ...state,
    options,
  }));

  readonly canSearch$ = this.select((state) => this.canSearch(state));
  readonly selectionGroup$ = this.select((state) => state.selectionGroup);

  private canSearch(state: CriteriaState) {
    return (
      state.searchString.length > 0 &&
      (state.selectionGroup !== SelectionGroup.CUSTOM ||
        state.workIds.length > 0)
    );
  }
}
