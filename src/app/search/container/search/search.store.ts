import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { SearchScope, Work } from 'kant-search-api';
import { filter, tap } from 'rxjs';
import { SearchOptions } from '../../model/search-output';

interface SearchState {
  workIds: number[];
  searchString: string;
  options: SearchOptions;
  isSearchAllowed: boolean;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor(private readonly router: Router) {
    super({
      workIds: [],
      searchString: '',
      options: { scope: SearchScope.Paragraph },
      isSearchAllowed: false,
    });
  }

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() =>
        this.router.navigate(['/search/results'], {
          queryParams: {
            workIds: this.get((state) => state.workIds).join(','),
            searchString: this.get((state) => state.searchString),
            scope: this.get((state) => state.options.scope),
          },
        })
      )
    )
  );

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
    isSearchAllowed: works.length > 0 && state.searchString.length > 0,
  }));
  readonly putSearchString = this.updater((state, searchString: string) => ({
    ...state,
    searchString,
    isSearchAllowed: state.workIds.length > 0 && searchString.length > 0,
  }));
  readonly putOptions = this.updater((state, options: SearchOptions) => ({
    ...state,
    options,
  }));

  readonly canSearch$ = this.select((state) => state.isSearchAllowed);
}
