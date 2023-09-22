import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Work } from 'kant-search-api';

interface SearchState {
  searchTerms: string[];
  workIds: number[];
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor() {
    super({ searchTerms: [], workIds: [] });
  }

  readonly putSearchTerms = this.updater((state, searchTerms: string) => ({
    ...state,
    searchTerms: searchTerms.split(' '),
  }));

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
  }));

  readonly isSearchPermitted$ = this.select(
    (state) => state.searchTerms.length > 0 && state.workIds.length > 0
  );
}
