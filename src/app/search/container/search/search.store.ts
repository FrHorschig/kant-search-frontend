import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Work } from 'kant-search-api';
import { filter, tap } from 'rxjs';

interface SearchState {
  searchTerms: string;
  workIds: number[];
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor(private readonly router: Router) {
    super({ searchTerms: '', workIds: [] });
  }

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      filter(
        () =>
          this.get((state) => state.searchTerms).length > 0 &&
          this.get((state) => state.workIds).length > 0
      ),
      tap(() =>
        this.router.navigate(['/search/results'], {
          queryParams: {
            searchTerms: this.get((state) => state.searchTerms),
            workIds: this.get((state) => state.workIds).join(','),
          },
        })
      )
    )
  );

  readonly putSearchTerms = this.updater((state, searchTerms: string) => ({
    ...state,
    searchTerms,
  }));

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
  }));

  readonly isSearchPermitted$ = this.select(
    (state) => state.searchTerms.length > 0 && state.workIds.length > 0
  );
}
