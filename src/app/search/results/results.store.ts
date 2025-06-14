import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  HttpError,
  IndexNumberPair,
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
import { SearchResult as ResultIntern, Snippet } from '../model/search-result';

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
            (err: Error) => {
              this.patchState({ ready: true });
              if (err instanceof HttpErrorResponse) {
                const e = err.error as HttpError;
                if (e.code !== 404) {
                  this.errorService.logError(err.error);
                }
              } else {
                this.errorService.logErrorString(err.message);
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
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: this.buildQueryParams(params),
        });
      })
    )
  );
  readonly navigateToSection = this.effect<string>((workCode$) =>
    workCode$.pipe(
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([workCode, params, lang]) => {
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: this.buildQueryParams(params),
          fragment: `results-${workCode}`,
        });
      })
    )
  );
  readonly navigateToHit = this.effect<string>((fragment$) =>
    fragment$.pipe(
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([fragment, params, lang]) => {
        this.router.navigate([`/${lang}/search/results`], {
          queryParams: this.buildQueryParams(params),
          fragment: fragment,
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

  private buildQueryParams(paramsMap: ParamMap): Params {
    const codes = paramsMap.get('workCodes')?.split(',') ?? [];
    return {
      searchTerms: this.get((state) => state.searchTerms),
      workCodes: codes.join(','),
      stems: paramsMap.get('stems') === 'true',
      incFn: paramsMap.get('incFn') === 'true',
      incHead: paramsMap.get('incHead') === 'true',
      incSumm: paramsMap.get('incSumm') === 'true',
    };
  }

  private mapResults(
    results: SearchResult[],
    workByCode: Map<string, Work>
  ): ResultIntern[] {
    const mapped = results.map((res) => {
      return {
        hits: res.hits.map((h, i) => {
          const matchIndices = this.findMatchIndices(h.highlightText);
          const fmtTextWithHl = this.insertHighlights(
            h.fmtText,
            matchIndices,
            h.wordIndexMap
          );
          const snippets = this.buildSnippets(
            h.highlightText,
            matchIndices,
            h.pages,
            h.pageByIndex,
            h.lineByIndex,
            h.wordIndexMap
          );
          return {
            snippets,
            fmtTextWithHl,
            ordinal: h.ordinal,
            index: i + 1,
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

  /**
   * @returns an array of tuples, each has the following values:
   * - index of the word that starts the highlighted part
   * - index of the word that ends the highlighted part
   * - length of the word that ends the highlighted part
   */
  private findMatchIndices(highlighted: string): HighlightData[] {
    const regex = /<ks-meta-hit>(.*?)<\/ks-meta-hit>/gs;
    const [hlStartLen, hlEndLen] = [
      '<ks-meta-hit>'.length,
      '</ks-meta-hit>'.length,
    ];
    const matchIndices: HighlightData[] = [];
    for (const match of highlighted.matchAll(regex)) {
      const index = match.index;
      const fullMatch = match[0];
      const tagContent = match[1];
      const lastWordIndex = tagContent.lastIndexOf(' ') + 1;
      const prevHlLen = (hlStartLen + hlEndLen) * matchIndices.length;
      const hlData: HighlightData = {
        startWord: index - prevHlLen,
        endWord: index + lastWordIndex - prevHlLen,
        endWordLen: tagContent.length - lastWordIndex,
        hlStart: index,
        hlEnd: index + fullMatch.length,
      };
      matchIndices.push(hlData);
    }
    return matchIndices;
  }

  private insertHighlights(
    formatted: string,
    hlData: HighlightData[],
    wordIndexMap: { [key: string]: number }
  ): string {
    const [hlStart, hlEnd] = ['<ks-meta-hit>', '</ks-meta-hit>'];
    for (let i = hlData.length - 1; i >= 0; i--) {
      const hld = hlData[i];
      const fmtStart = wordIndexMap[hld.startWord.toString()];
      const fmtEnd = wordIndexMap[hld.endWord.toString()] + hld.endWordLen;
      formatted =
        formatted.substring(0, fmtStart) +
        hlStart +
        formatted.substring(fmtStart, fmtEnd) +
        hlEnd +
        formatted.substring(fmtEnd);
    }
    return formatted;
  }

  private buildSnippets(
    highlighted: string,
    hlData: HighlightData[],
    pages: number[],
    pageByIndex: IndexNumberPair[],
    lineByIndex: IndexNumberPair[],
    wordIndexMap: { [key: string]: number }
  ): Snippet[] {
    const maxCharsBetween = 100;
    const merged: HighlightData[] = [hlData[0]];
    for (let i = 1; i < hlData.length; i++) {
      if (hlData[i].endWord - hlData[i - 1].startWord > maxCharsBetween) {
        merged.push(hlData[i]);
      } else {
        merged[merged.length - 1].endWord = hlData[i].endWord;
        merged[merged.length - 1].endWordLen = hlData[i].endWordLen;
        merged[merged.length - 1].hlEnd = hlData[i].hlEnd;
      }
    }

    const maxCharsAround = maxCharsBetween - 30;
    const snippets: Snippet[] = [];
    for (let i = 0; i < merged.length; i++) {
      const hld = merged[i];

      let textStart = hld.hlStart - maxCharsAround;
      if (textStart < 0) {
        textStart = 0;
      } else {
        textStart =
          i > 0 && textStart < merged[i - 1].hlEnd
            ? merged[i - 1].hlEnd
            : textStart;
        for (let j = textStart; j < hld.hlStart; j++) {
          if (highlighted[j] === ' ') {
            textStart = j + 1;
            break;
          }
        }
      }

      let textEnd = hld.hlEnd + maxCharsAround;
      if (textEnd > highlighted.length - 1) {
        textEnd = highlighted.length - 1;
      } else {
        textEnd =
          i < merged.length - 1 && textEnd > merged[i + 1].hlStart
            ? merged[i + 1].hlStart
            : textEnd;
        for (let j = textEnd; j > hld.hlEnd; j--) {
          if (highlighted[j] === ' ') {
            textEnd = j;
            break;
          }
        }
      }

      snippets.push({
        page: this.findPageNum(
          wordIndexMap[hld.startWord.toString()],
          pages,
          pageByIndex
        ),
        line: this.findLineNum(
          wordIndexMap[hld.startWord.toString()],
          lineByIndex
        ),
        text: highlighted.substring(textStart, textEnd),
      });
    }
    return snippets;
  }

  private findPageNum(
    wordIndex: number,
    pages: number[],
    pageByIndex: IndexNumberPair[]
  ): number {
    if (pageByIndex.length == 0) {
      return pages[0];
    }
    for (let i = pageByIndex.length - 1; i >= 0; i--) {
      if (wordIndex > pageByIndex[i].i) {
        return pageByIndex[i].num;
      }
    }
    return pages[0];
  }

  private findLineNum(
    wordIndex: number,
    lineByIndex: IndexNumberPair[]
  ): number {
    for (let i = lineByIndex.length - 1; i >= 0; i--) {
      if (wordIndex > lineByIndex[i].i) {
        return lineByIndex[i].num;
      }
    }
    return 1;
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

interface HighlightData {
  startWord: number;
  endWord: number;
  endWordLen: number;
  hlStart: number;
  hlEnd: number;
}
