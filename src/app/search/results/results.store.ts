import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  HttpError,
  ReadService,
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
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { Work } from 'src/app/common/model/work';

interface ResultsState {
  searchTerms: string;
  results: SearchResult[];
  isLoaded: boolean;
  resultTextByOrdinal: Map<number, string>;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore,
    private readonly searchService: SearchService,
    private readonly readService: ReadService
  ) {
    super({
      searchTerms: '',
      results: [],
      isLoaded: false,
      resultTextByOrdinal: new Map(),
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
          resultTextByOrdinal: new Map(),
        })
      ),
      switchMap((criteria: SearchCriteria) =>
        this.searchService.search(criteria).pipe(
          withLatestFrom(this.volStore.workByCode$),
          tapResponse(
            ([results, workByCode]) => {
              this.patchState({
                results: this.sort(results, Array.from(workByCode.values())),
                isLoaded: true,
              });
              this.loadContents(criteria, results);
            },
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
  readonly isLoaded$ = this.select((state) => state.isLoaded);
  readonly resultTextByOrdinal$ = this.select(
    (state) => state.resultTextByOrdinal
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

  private loadContents(criteria: SearchCriteria, results: SearchResult[]) {
    results.forEach((res) => {
      const code = res.workCode;
      const ordinals = res.hits.map((h) => h.ordinal);
      this.loadParagraphs({ code, ordinals });
      if (criteria.options.includeHeadings) {
        this.loadHeadings({ code, ordinals });
      }
      if (criteria.options.includeFootnotes) {
        this.loadFootnotes({ code, ordinals });
      }
      if (criteria.options.includeSummaries) {
        this.loadSummaries({ code, ordinals });
      }
    });
  }

  private loadParagraphs = this.effect<{ code: string; ordinals: number[] }>(
    (params$) =>
      params$.pipe(
        switchMap(({ code, ordinals }) =>
          this.readService.getParagraphs(code, ordinals).pipe(
            tapResponse((pars) => {
              const ordAndText = pars.map(
                (p) => [p.ordinal, p.text] as [number, string]
              );
              this.addToExistingResults(ordAndText);
            }, this.handleLoadContentError)
          )
        )
      )
  );
  private loadHeadings = this.effect<{ code: string; ordinals: number[] }>(
    (params$) =>
      params$.pipe(
        switchMap(({ code, ordinals }) =>
          this.readService.getHeadings(code, ordinals).pipe(
            tapResponse((heads) => {
              const ordAndText = heads.map(
                (h) => [h.ordinal, h.text] as [number, string]
              );
              this.addToExistingResults(ordAndText);
            }, this.handleLoadContentError)
          )
        )
      )
  );
  private loadFootnotes = this.effect<{ code: string; ordinals: number[] }>(
    (params$) =>
      params$.pipe(
        switchMap(({ code, ordinals }) =>
          this.readService.getFootnotes(code, ordinals).pipe(
            tapResponse((fns) => {
              const ordAndText = fns.map(
                (f) => [f.ordinal, f.text] as [number, string]
              );
              this.addToExistingResults(ordAndText);
            }, this.handleLoadContentError)
          )
        )
      )
  );
  private loadSummaries = this.effect<{ code: string; ordinals: number[] }>(
    (params$) =>
      params$.pipe(
        switchMap(({ code, ordinals }) =>
          this.readService.getSummaries(code, ordinals).pipe(
            tapResponse((summs) => {
              const ordAndText = summs.map(
                (s) => [s.ordinal, s.text] as [number, string]
              );
              this.addToExistingResults(ordAndText);
            }, this.handleLoadContentError)
          )
        )
      )
  );

  private addToExistingResults(ordAndText: [number, string][]) {
    this.patchState((state) => {
      const updatedMap = new Map(state.resultTextByOrdinal);
      for (const [ordinal, text] of ordAndText) {
        updatedMap.set(ordinal, text);
      }
      return {
        ...state,
        resultTextByOrdinal: updatedMap,
      };
    });
  }

  private handleLoadContentError(err: HttpErrorResponse) {
    // if this happens, we just show a message when the user opens the paragraph-dialog, because if the user never uses the dialog, this error here is without consequence
    console.error('error during content load: ' + err.message);
  }
}
