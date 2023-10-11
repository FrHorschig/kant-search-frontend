import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { SearchScope, Work } from 'kant-search-api';
import { switchMap, tap } from 'rxjs';
import { SearchOptions } from '../../model/search-output';
import { Section, BasicInput } from '../../model/simple-input';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';

interface SearchState {
  workIds: number[];
  section: Section;
  searchString: string;
  options: SearchOptions;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor(
    private readonly router: Router,
    private readonly workStore: Store
  ) {
    super({
      workIds: [],
      section: Section.ALL,
      searchString: '',
      options: { scope: SearchScope.Paragraph },
    });
  }

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.workStore.select(WorksReducers.selectWorksBySection).pipe(
          tap((worksBySection) => {
            this.router.navigate(['/search/results'], {
              queryParams: {
                workIds: this.getWorkIds(worksBySection).join(','),
                searchString: this.get((state) => state.searchString),
                scope: this.get((state) => state.options.scope),
              },
            });
          })
        )
      )
    )
  );

  readonly putWorks = this.updater((state, works: Work[]) => ({
    ...state,
    workIds: works.map((work) => work.id),
  }));
  readonly putSimpleInput = this.updater((state, options: BasicInput) => ({
    ...state,
    section: options.section,
    searchString: options.searchString,
  }));
  readonly putOptions = this.updater((state, options: SearchOptions) => ({
    ...state,
    options,
  }));

  readonly canSearch$ = this.select((state) => state.searchString.length > 0);

  private getWorkIds(worksBySection: Map<Section, Work[]>): number[] {
    if (this.get((state) => state.section) === Section.CUSTOM) {
      return this.get((state) => state.workIds);
    }
    return (
      worksBySection
        .get(this.get((state) => state.section))
        ?.map((work) => work.id) || []
    );
  }
}
