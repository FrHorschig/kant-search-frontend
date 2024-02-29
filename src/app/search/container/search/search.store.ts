import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { SearchScope, Work } from '@frhorschig/kant-search-api';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { SearchOptions } from '../../model/search-output';
import { Section, BasicInput } from '../../model/simple-input';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';
import { LanguageStore } from 'src/app/store/language/language.store';

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
    private readonly workStore: Store,
    private readonly langStore: LanguageStore
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
      filter(() => this.get((state) => state.searchString) !== ''),
      switchMap(() =>
        this.workStore.select(WorksReducers.selectWorksBySection).pipe(
          withLatestFrom(this.langStore.currentLanguage$),
          tap(([worksBySection, lang]) => {
            this.router.navigate([`/${lang}/search/results`], {
              queryParams: {
                workIds: this.toCompactList(this.getWorkIds(worksBySection)),
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
  readonly putBasicInput = this.updater((state, options: BasicInput) => ({
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
        ?.map((work) => work.id) ?? []
    );
  }

  private toCompactList(ids: number[]): string {
    return ids.join(',');
  }
}
