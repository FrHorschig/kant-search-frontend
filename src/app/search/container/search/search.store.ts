import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Work } from 'kant-search-api';
import { filter, tap } from 'rxjs';
import { SearchInput } from '../../model/search-input';

interface SearchState {
  workIds: number[];
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor(private readonly router: Router) {
    super({ workIds: [] });
  }

  readonly navigateSearch = this.effect<SearchInput>((input$) =>
    input$.pipe(
      filter(
        (input) =>
          input.searchString.length > 0 &&
          this.get((state) => state.workIds).length > 0
      ),
      tap((input) =>
        this.router.navigate(['/search/results'], {
          queryParams: {
            workIds: this.get((state) => state.workIds).join(','),
            searchString: input.searchString,
            scope: input.scope,
          },
        })
      )
    )
  );

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
  }));

  readonly hasWorks = this.select((state) => state.workIds.length > 0);
}
