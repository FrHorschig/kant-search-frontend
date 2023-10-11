import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  SearchCriteria,
  SearchResult,
  SearchScope,
  SearchService,
} from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';
import { FullTextInfo } from '../../model/full-text-info';

interface ResultsState {
  criteria: SearchCriteria;
  results: SearchResult[];
  isLoading: boolean;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore,
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly searchService: SearchService
  ) {
    super({
      criteria: {
        workIds: [],
        searchString: '',
        options: { scope: SearchScope.Paragraph },
      },
      results: [],
      isLoading: false,
    });
  }

  readonly searchParagraphs = this.effect<SearchCriteria>((criteria$) =>
    criteria$.pipe(
      tap(() => this.messageService.clear()),
      tap((criteria) =>
        this.patchState({ criteria: criteria, results: [], isLoading: true })
      ),
      switchMap((criteria) =>
        this.searchService.search(criteria).pipe(
          tapResponse(
            (result) => this.patchState({ results: result, isLoading: false }),
            (err: HttpErrorResponse) => {
              this.patchState({ isLoading: false });
              if (err.status !== 404) {
                this.errorService.logError(err.error);
              }
              return EMPTY;
            }
          )
        )
      )
    )
  );
  readonly updateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      filter(() => this.get((state) => state.criteria.searchString) !== ''),
      tap(() => this.messageService.clear()),
      withLatestFrom(
        this.select((state) => state.criteria),
        this.langStore.currentLanguage$
      ),
      tap(([_, criteria, lang]) =>
        this.router.navigate([`${lang}/search/results`], {
          queryParams: {
            workIds: criteria.workIds.join(','),
            searchString: criteria.searchString,
            scope:
              criteria.options.scope === SearchScope.Sentence
                ? SearchScope.Sentence
                : SearchScope.Paragraph,
          },
        })
      )
    )
  );
  readonly navigateToFullText = this.effect<FullTextInfo>((info$) =>
    info$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([info, lang]) => {
        this.router.navigate([`${lang}/read/text`, info.workId], {
          fragment: info.fragment,
        });
      })
    )
  );

  readonly updateSearchString = this.updater((state, searchString: string) => ({
    ...state,
    criteria: { ...state.criteria, searchString },
  }));

  readonly searchString$ = this.select((state) => state.criteria.searchString);
  readonly results$ = this.select((state) => state.results);
  readonly isLoading$ = this.select((state) => state.isLoading);
}
