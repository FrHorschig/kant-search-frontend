import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchScope, Work } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';
import { WorksStore } from 'src/app/store/works/works.store';
import { SearchOptions } from '../../model/search-output';
import { SelectionGroup } from '../../model/selection-group';

interface SearchState {
  workIds: number[];
  selectionGroup: SelectionGroup;
  searchString: string;
  options: SearchOptions;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor(
    private readonly router: Router,
    private readonly worksStore: WorksStore,
    private readonly langStore: LanguageStore,
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
      switchMap(() =>
        this.worksStore.worksBySection$.pipe(
          withLatestFrom(this.langStore.currentLanguage$),
          tap(([worksBySection, lang]) => {
            this.router.navigate([`/${lang}/search/results`], {
              queryParams: {
                workIds: this.toCompactList(this.getWorkIds(worksBySection)),
                searchString: this.get((state) => state.searchString),
                scope: this.get((state) => state.options.scope),
              },
            });
          }),
        ),
      ),
    ),
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

  private getWorkIds(worksBySection: Map<SelectionGroup, Work[]>): number[] {
    if (this.get((state) => state.selectionGroup) === SelectionGroup.CUSTOM) {
      return this.get((state) => state.workIds);
    }
    return (
      worksBySection
        .get(this.get((state) => state.selectionGroup))
        ?.map((work) => work.id) ?? []
    );
  }

  private toCompactList(ids: number[]): string {
    if (ids.length === 0) {
      return '';
    }

    let result = '';
    let rangeStart = ids[0];
    let rangeEnd = ids[0];
    for (let i = 1; i < ids.length; i++) {
      if (ids[i] === rangeEnd + 1) {
        rangeEnd = ids[i];
      } else {
        result += this.createWorkIdListItem(rangeStart, rangeEnd);
        rangeStart = ids[i];
        rangeEnd = ids[i];
      }
    }

    result += this.createWorkIdListItem(rangeStart, rangeEnd);
    return result.slice(0, -1);
  }

  private createWorkIdListItem(rangeStart: number, rangeEnd: number) {
    return rangeStart === rangeEnd
      ? `${rangeStart},`
      : `${rangeStart}-${rangeEnd},`;
  }

  private canSearch(state: SearchState) {
    return (
      state.searchString.length > 0 &&
      (state.selectionGroup !== SelectionGroup.CUSTOM ||
        state.workIds.length > 0)
    );
  }
}
