import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  HttpError,
  SearchCriteria,
  SearchResult,
  SearchScope,
  SearchService,
} from '@frhorschig/kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';
import { FullTextInfo } from '../../model/full-text-info';

interface ResultsState {
  searchString: string;
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
      searchString: '',
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
          searchString: criteria.searchString,
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
  readonly updateSearch = this.effect<string>((searchString$) =>
    searchString$.pipe(
      filter((searchString) => searchString !== ''),
      tap(() => this.messageService.clear()),
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([searchString, params, lang]) => {
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            workIds: params.get('workIds'),
            searchString: searchString,
            scope: params.get('scope'),
          },
        });
      })
    )
  );
  readonly navigateToFullText = this.effect<FullTextInfo>((info$) =>
    info$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([info, lang]) => {
        this.router.navigate([`/${lang}/read/text`, info.workId], {
          fragment: info.fragment,
        });
        return EMPTY;
      })
    )
  );

  readonly searchString$ = this.select((state) => state.searchString);
  readonly results$ = this.select((state) => state.results);
  readonly isLoaded$ = this.select((state) => state.isLoaded);

  private criteriaFromParams(params: ParamMap): SearchCriteria {
    const workIdsParam = params.get('workIds');
    const criteria: SearchCriteria = {
      workIds: workIdsParam ? this.fromCompactList(workIdsParam) : [],
      searchString: params.get('searchString') ?? '',
      options: {
        scope:
          params.get('scope') === 'SENTENCE'
            ? SearchScope.Sentence
            : SearchScope.Paragraph,
      },
    };
    return criteria;
  }

  private fromCompactList(param: string): number[] {
    let result: number[] = [];
    const lst = param.split(',');
    for (const l of lst) {
      const startEnd = l.split('-');
      if (startEnd.length === 2) {
        for (let i = +startEnd[0]; i <= +startEnd[1]; i++) {
          result.push(i);
        }
      } else {
        result.push(+l);
      }
    }
    return result;
  }
}
