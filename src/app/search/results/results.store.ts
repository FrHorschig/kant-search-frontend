import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  HttpError,
  SearchCriteria,
  SearchResult,
  SearchScope,
  SearchService,
} from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { MessageService } from 'primeng/api';
import { EMPTY, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';
import { FullTextInfo } from '../model/full-text-info';

interface ResultsState {
  searchTerms: string;
  results: SearchResult[];
  isLoaded: boolean;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly langStore: LanguageStore,
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly searchService: SearchService
  ) {
    super({
      searchTerms: '',
      results: [],
      isLoaded: false,
    });
  }

  readonly searchParagraphs = this.effect<void>(() =>
    this.route.queryParamMap.pipe(
      tap(() => this.messageService.clear()),
      map((params) => this.criteriaFromParams(params)),
      tap((criteria) =>
        this.patchState({
          searchTerms: criteria.searchTerms,
          results: [],
          isLoaded: false,
        })
      ),
      switchMap((criteria: SearchCriteria) =>
        this.searchService.search(criteria).pipe(
          tapResponse(
            (result) => this.patchState({ results: result, isLoaded: true }),
            (err: HttpErrorResponse) => {
              this.patchState({ isLoaded: true });
              const e = err.error as HttpError;
              if (e.code !== 404) {
                this.errorService.logError(err.error);
              }
              return EMPTY;
            }
          )
        )
      )
    )
  );
  readonly updateSearch = this.effect<void>((effect$) =>
    effect$.pipe(
      tap(() => this.messageService.clear()),
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([_, params, lang]) => {
        const codes = params.get('workCodes')?.split(',') ?? [];
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            incHead: params.get('incHead') === 'true',
            incFn: params.get('incFn') === 'true',
            incSumm: params.get('incSumm') === 'true',
            searchTerms: this.get((state) => state.searchTerms),
            workCodes: this.get((state) => codes.join(',')),
          },
        });
      })
    )
  );
  readonly navigateToFullText = this.effect<FullTextInfo>((info$) =>
    info$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([info, lang]) => {
        this.router.navigate([`/${lang}/read/text`, info.workCode], {
          fragment: info.fragment,
        });
        return EMPTY;
      })
    )
  );

  readonly putSearchTerms = this.updater((state, searchTerms: string) => ({
    ...state,
    searchTerms,
  }));

  readonly searchTerms$ = this.select((state) => state.searchTerms);
  readonly results$ = this.select((state) => state.results);
  readonly isLoaded$ = this.select((state) => state.isLoaded);

  private criteriaFromParams(params: ParamMap): SearchCriteria {
    const codes = params.get('workCodes')?.split(',') ?? [];
    const criteria: SearchCriteria = {
      searchTerms: params.get('searchTerms') ?? '',
      options: {
        includeHeadings: params.get('incHead') === 'true',
        includeFootnotes: params.get('incFn') === 'true',
        includeSummaries: params.get('incSumm') === 'true',
        scope: SearchScope.Paragraph,
        workCodes: Array.from(new Set(codes)),
      },
    };
    return criteria;
  }
}
