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
import { EMPTY, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';
import { FullTextInfo } from '../model/full-text-info';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { Work } from 'src/app/common/model/work';

interface ResultsState {
  searchTerms: string;
  results: SearchResult[];
  ready: boolean;
  textByCodeByOrdinal: Map<string, Map<number, string>>;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly errorService: ErrorService,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore,
    private readonly searchService: SearchService
  ) {
    super({
      searchTerms: '',
      results: [],
      textByCodeByOrdinal: new Map(),
      ready: false,
    });
  }

  readonly search = this.effect<void>(() =>
    this.route.queryParamMap.pipe(
      map((params) => this.criteriaFromParams(params)),
      tap((criteria) =>
        this.patchState({
          searchTerms: criteria.searchTerms,
          results: [],
          textByCodeByOrdinal: new Map(),
          ready: false,
        })
      ),
      switchMap((criteria: SearchCriteria) =>
        this.searchService.search(criteria).pipe(
          withLatestFrom(this.volStore.workByCode$),
          tapResponse(
            ([results, workByCode]) => {
              results = results ? results : [];
              this.patchState({
                results: this.sort(results, Array.from(workByCode.values())),
                textByCodeByOrdinal: this.collectTexts(results),
                ready: true,
              });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ ready: true });
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
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([_, params, lang]) => {
        const codes = params.get('workCodes')?.split(',') ?? [];
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            searchTerms: this.get((state) => state.searchTerms),
            workCodes: codes.join(','),
            incFn: params.get('incFn') === 'true',
            incHead: params.get('incHead') === 'true',
            incSumm: params.get('incSumm') === 'true',
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
  readonly ready$ = this.select((state) => state.ready);
  readonly textByCodeByOrdinal$ = this.select(
    (state) => state.textByCodeByOrdinal
  );

  private criteriaFromParams(params: ParamMap): SearchCriteria {
    const codes = params.get('workCodes')?.split(',') ?? [];
    const criteria: SearchCriteria = {
      searchTerms: params.get('searchTerms') ?? '',
      options: {
        workCodes: Array.from(new Set(codes)),
        scope: SearchScope.Paragraph,
        includeFootnotes: params.get('incFn') === 'true',
        includeHeadings: params.get('incHead') === 'true',
        includeSummaries: params.get('incSumm') === 'true',
      },
    };
    return criteria;
  }

  private sort(results: SearchResult[], allWorks: Work[]): SearchResult[] {
    const resultByCode = results.reduce((map, r) => {
      map.set(r.workCode, r);
      return map;
    }, new Map<string, SearchResult>());
    const resultWorks = allWorks.filter((w) => resultByCode.has(w.code));
    resultWorks.sort((a, b) => {
      if (a.volumeNumber !== b.volumeNumber) {
        return a.volumeNumber - b.volumeNumber;
      }
      return a.ordinal - b.ordinal;
    });
    return resultWorks.map((w) => resultByCode.get(w.code)!);
  }

  private collectTexts(
    results: SearchResult[]
  ): Map<string, Map<number, string>> {
    const result = new Map<string, Map<number, string>>();
    results.forEach((res) => {
      const byOrdinal = new Map<number, string>();
      result.set(res.workCode, byOrdinal);
      res.hits.forEach((r) => byOrdinal.set(r.ordinal, r.text ?? ''));
    });
    return result;
  }
}
