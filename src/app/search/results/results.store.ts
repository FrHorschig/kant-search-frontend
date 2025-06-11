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
import { EMPTY, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';
import { FullTextInfo } from '../model/full-text-info';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { Work } from 'src/app/store/volumes/model';
import { SearchResult as ResultIntern } from '../model/search-result';

interface ResultsState {
  searchTerms: string;
  results: ResultIntern[];
  ready: boolean;
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
                results: this.mapResults(results, workByCode),
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
      filter(() => this.get((state) => state.searchTerms != '')),
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([_, params, lang]) => {
        const codes = params.get('workCodes')?.split(',') ?? [];
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: {
            searchTerms: this.get((state) => state.searchTerms),
            workCodes: codes.join(','),
            stems: params.get('stems') === 'true',
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

  private criteriaFromParams(params: ParamMap): SearchCriteria {
    const codes = params.get('workCodes')?.split(',') ?? [];
    const criteria: SearchCriteria = {
      searchTerms: params.get('searchTerms') ?? '',
      options: {
        workCodes: Array.from(new Set(codes)),
        scope: SearchScope.Paragraph,
        withStemming: params.get('stems') === 'true',
        includeFootnotes: params.get('incFn') === 'true',
        includeHeadings: params.get('incHead') === 'true',
        includeSummaries: params.get('incSumm') === 'true',
      },
    };
    return criteria;
  }

  private mapResults(
    results: SearchResult[],
    workByCode: Map<string, Work>
  ): ResultIntern[] {
    const mapped = results.map((res) => {
      return {
        hits: res.hits.map((h, i) => {
          return {
            ordinal: h.ordinal,
            pages: h.pages,
            snippets: h.snippets,
            text: h.text ?? '',
            index: i,
            work: workByCode.get(res.workCode) ?? {
              code: '',
              sections: [],
              ordinal: 0,
              title: '',
              volumeNumber: 0,
              volumeTitle: '',
            },
          };
        }),
        workCode: res.workCode,
      };
    });
    return this.sort(mapped, Array.from(workByCode.values()));
  }

  private sort(results: ResultIntern[], allWorks: Work[]): ResultIntern[] {
    const resultByCode = results.reduce((map, r) => {
      map.set(r.workCode, r);
      return map;
    }, new Map<string, ResultIntern>());
    const resultWorks = allWorks.filter((w) => resultByCode.has(w.code));
    resultWorks.sort((a, b) => {
      if (a.volumeNumber !== b.volumeNumber) {
        return a.volumeNumber - b.volumeNumber;
      }
      return a.ordinal - b.ordinal;
    });
    return resultWorks.map((w) => resultByCode.get(w.code)!);
  }
}
