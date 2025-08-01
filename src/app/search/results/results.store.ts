import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import {
  Hit,
  IndexNumberPair,
  SearchCriteria,
  SearchResult,
  SearchService,
} from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/common/store/language.store';
import { FullTextInfo } from '../model/full-text-info';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { emptyWork, Work } from 'src/app/common/model/model';
import {
  Hit as HitInternal,
  SearchResult as ResultInternal,
  Snippet,
} from '../model/search-result';
import { ResultSort } from '../model/search-options';

interface ResultsState {
  searchTerms: string;
  results: ResultInternal[];
  hits: HitInternal[];
  page: number;
  pageSize: number;
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
      hits: [],
      page: 1,
      pageSize: 5,
      ready: false,
    });
  }

  readonly searchTerms$ = this.select((state) => state.searchTerms);
  readonly results$ = this.select((state) => state.results);
  readonly hits$ = this.select((state) => state.hits);
  readonly page$ = this.select((state) => state.page);
  readonly pageSize$ = this.select((state) => state.pageSize);
  readonly ready$ = this.select((state) => state.ready);

  readonly search = this.effect<void>(() =>
    this.route.queryParamMap.pipe(
      map((params) => [params, this.criteriaFromParams(params)] as const),
      tap(([_, criteria]) =>
        this.patchState({
          searchTerms: criteria.searchTerms,
          results: [],
          hits: [],
          page: 1,
          ready: false,
        })
      ),
      switchMap(([params, criteria]) =>
        this.searchService.search(criteria).pipe(
          withLatestFrom(this.volStore.workByCode$, this.route.fragment),
          tapResponse(
            ([results, workByCode, fragment]) => {
              const pageMatch = fragment?.match(/^page(\d+)$/);
              const [mapped, hits] = this.mapResults(
                params.get('sort'),
                results ?? [],
                workByCode
              );
              this.patchState({
                results: mapped,
                hits: hits,
                page: pageMatch ? +pageMatch[1] : 1,
                ready: true,
              });
            },
            (err: Error) => {
              this.errorService.logError(err);
              this.patchState({ ready: true });
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
        this.router.navigate([lang, 'search', 'results'], {
          queryParams: this.buildQueryParams(params),
        });
      })
    )
  );
  readonly navigateToPage = this.effect<number>((page$) =>
    page$.pipe(
      withLatestFrom(this.route.queryParamMap, this.langStore.currentLanguage$),
      tap(([page, params, lang]) => {
        this.patchState({ page });
        this.router.navigate([lang, 'search', 'results'], {
          queryParams: this.buildQueryParams(params),
          fragment: `page${page}`,
        });
      })
    )
  );
  readonly navigateToSection = this.effect<string>((workCode$) =>
    workCode$.pipe(
      tap((workCode) => {
        const pageSize = this.get((s) => s.pageSize);
        let hitCount = 0;
        for (const r of this.get((s) => s.results)) {
          if (r.workCode === workCode) {
            const page = Math.floor(hitCount / pageSize) + 1;
            this.navigateToPage(page);
            break;
          } else {
            hitCount += r.hits.length;
          }
        }
      })
    )
  );
  readonly navigateToFullText = this.effect<FullTextInfo>((info$) =>
    info$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([info, lang]) => {
        this.router.navigate([lang, 'read', 'text', info.workCode], {
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

  private criteriaFromParams(params: ParamMap): SearchCriteria {
    const codes = params.get('workCodes')?.split(',') ?? [];
    const criteria: SearchCriteria = {
      searchTerms: params.get('searchTerms') ?? '',
      options: {
        workCodes: Array.from(new Set(codes)),
        withStemming: params.get('stems') === 'true',
        includeHeadings: params.get('incHead') === 'true',
        includeParagraphs: params.get('incPars') === 'true',
        includeFootnotes: params.get('incFn') === 'true',
      },
    };
    return criteria;
  }

  private buildQueryParams(paramsMap: ParamMap): Params {
    const codes = paramsMap.get('workCodes')?.split(',') ?? [];
    const queryParams: Params = {
      searchTerms: this.get((state) => state.searchTerms),
      workCodes: codes.join(','),
    };
    if (paramsMap.get('sort') === ResultSort.Year) {
      queryParams['sort'] = ResultSort.Year;
    }
    if (paramsMap.get('stems') === 'true') {
      queryParams['stems'] = true;
    }
    if (paramsMap.get('incFn') === 'true') {
      queryParams['incFn'] = true;
    }
    if (paramsMap.get('incHead') === 'true') {
      queryParams['incHead'] = true;
    }
    if (paramsMap.get('incPars') === 'true') {
      queryParams['incPars'] = true;
    }
    return queryParams;
  }

  private mapResults(
    sortParam: string | null,
    results: SearchResult[],
    workByCode: Map<string, Work>
  ): [ResultInternal[], HitInternal[]] {
    const sort = sortParam === 'YEAR' ? ResultSort.Year : ResultSort.AaOrder;
    results = this.sort(sort, results ?? [], Array.from(workByCode.values()));
    let indexTotal = 1;
    const mapped = results.map((res) => {
      return {
        hits: res.hits.map((h) => {
          const matchIndices = this.findMatchIndices(h.highlightText);
          const hasHl = h.highlightText.includes('<ks-meta-hit>');
          const fmtTextWithHl = hasHl
            ? this.insertHighlights(h.fmtText, h.wordIndexMap, matchIndices)
            : h.fmtText;
          const snippets = hasHl
            ? this.buildHlSnippets(matchIndices, h)
            : this.buildStartSnippet(h);
          return {
            snippets,
            fmtTextWithHl,
            ordinal: h.ordinal,
            index: indexTotal++,
            work: workByCode.get(res.workCode) ?? emptyWork,
          };
        }),
        workCode: res.workCode,
      };
    });
    return [mapped, mapped.flatMap((r) => r.hits)];
  }

  private buildStartSnippet(h: Hit): Snippet[] {
    const snippetLen = 100;
    let textSnippet = h.highlightText;
    if (h.highlightText.length > snippetLen) {
      const cutoffIndex = h.highlightText.lastIndexOf(' ', snippetLen);
      const safeIndex = cutoffIndex > -1 ? cutoffIndex : snippetLen;
      textSnippet = h.highlightText.substring(0, safeIndex);
    }
    return [
      {
        page: this.findPageNum(h.wordIndexMap[0], h.pageByIndex, h.pages),
        line: this.findLineNum(h.wordIndexMap[0], h.lineByIndex),
        text: textSnippet,
        hasHighlights: false,
      },
    ];
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
    wordIndexMap: { [key: string]: number },
    hlData: HighlightData[]
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

  private buildHlSnippets(hlData: HighlightData[], hit: Hit): Snippet[] {
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
      const hlText = hit.highlightText;
      const textStart = this.findTextStart(i, merged, maxCharsAround, hlText);
      const textEnd = this.findTextEnd(i, merged, maxCharsAround, hlText);
      snippets.push({
        page: this.findPageNum(
          hit.wordIndexMap[hld.startWord.toString()],
          hit.pageByIndex,
          hit.pages
        ),
        line: this.findLineNum(
          hit.wordIndexMap[hld.startWord.toString()],
          hit.lineByIndex
        ),
        text: hlText.substring(textStart, textEnd),
        hasHighlights: true,
      });
    }
    return snippets;
  }

  private findTextStart(
    i: number,
    merged: HighlightData[],
    maxCharsAround: number,
    hlText: string
  ): number {
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
        if (hlText[j] === ' ') {
          textStart = j + 1;
          break;
        }
      }
    }
    return textStart;
  }

  findTextEnd(
    i: number,
    merged: HighlightData[],
    maxCharsAround: number,
    hlText: string
  ): number {
    const hld = merged[i];
    let textEnd = hld.hlEnd + maxCharsAround;
    if (textEnd > hlText.length - 1) {
      textEnd = hlText.length;
    } else {
      textEnd =
        i < merged.length - 1 && textEnd > merged[i + 1].hlStart
          ? merged[i + 1].hlStart
          : textEnd;
      for (let j = textEnd; j > hld.hlEnd; j--) {
        if (hlText[j] === ' ') {
          textEnd = j;
          break;
        }
      }
    }
    return textEnd;
  }

  private findPageNum(
    wordIndex: number,
    pageByIndex: IndexNumberPair[],
    pages: number[]
  ): number {
    if (pageByIndex.length == 0) {
      return pages[0];
    }
    for (let i = pageByIndex.length - 1; i >= 0; i--) {
      if (pageByIndex[i].i < wordIndex) {
        return pageByIndex[i].num;
      }
    }
    return pages[0] - 1;
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

  private sort(
    sort: ResultSort,
    results: SearchResult[],
    allWorks: Work[]
  ): SearchResult[] {
    const resultByCode = results.reduce((map, r) => {
      map.set(r.workCode, r);
      return map;
    }, new Map<string, SearchResult>());
    const resultWorks = allWorks.filter((w) => resultByCode.has(w.code));
    if (sort === ResultSort.AaOrder) {
      resultWorks.sort((a, b) => {
        if (a.volumeNumber !== b.volumeNumber) {
          return a.volumeNumber - b.volumeNumber;
        }
        return a.ordinal - b.ordinal;
      });
    } else {
      resultWorks.sort((a, b) => a.year.localeCompare(b.year));
    }
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
