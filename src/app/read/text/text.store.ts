import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  Footnote,
  Heading,
  Paragraph,
  ReadService,
  Section,
  Summary,
} from '@frhorschig/kant-search-api';
import { EMPTY, forkJoin, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { TextContent } from './model';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { Work } from 'src/app/common/model/work';
import { LanguageStore } from 'src/app/store/language/language.store';
import { Router } from '@angular/router';

interface ReadState {
  work: Work | undefined;
  headingByOrdinal: Map<number, Heading>;
  textContents: TextContent[];
  footnoteByRef: Map<string, Footnote>;
  summaryByRef: Map<string, Summary>;
}

@Injectable()
export class TextStore extends ComponentStore<ReadState> {
  constructor(
    private readonly router: Router,
    private readonly errorService: ErrorService,
    private readonly langStore: LanguageStore,
    private readonly readService: ReadService,
    private readonly volStore: VolumesStore
  ) {
    super({
      work: undefined,
      headingByOrdinal: new Map(),
      textContents: [],
      footnoteByRef: new Map(),
      summaryByRef: new Map(),
    });
  }

  readonly work$ = this.select((state) => state.work);
  readonly textContents$ = this.select((state) => state.textContents);
  readonly headingByOrdinal$ = this.select((state) => state.headingByOrdinal);
  readonly footnoteByRef$ = this.select((state) => state.footnoteByRef);
  readonly summaryByRef$ = this.select((state) => state.summaryByRef);
  readonly ready$ = this.select((state) => state.textContents.length > 0);

  readonly loadData = this.effect<string>((workCode) =>
    workCode.pipe(
      withLatestFrom(this.volStore.workByCode$),
      switchMap(([workCode, workByCode]) =>
        forkJoin({
          headings: this.readService.getHeadings(workCode),
          footnotes: this.readService.getFootnotes(workCode),
          paragraphs: this.readService.getParagraphs(workCode),
          summaries: this.readService.getSummaries(workCode),
        }).pipe(
          // TODO improve performance: load work first, and the rest in the background, while loading the paragraphs of the first section of the section of the linked paragraph first
          tapResponse(
            ({ headings, footnotes, paragraphs, summaries }) => {
              const work = workByCode.get(workCode);
              if (!work) {
                throw new Error('no work with code ' + workCode + ' found');
              }
              const headsByOrd = new Map(headings.map((h) => [h.ordinal, h]));
              const parsByOrd = new Map(paragraphs.map((p) => [p.ordinal, p]));
              this.patchState({
                work,
                headingByOrdinal: new Map(headings.map((h) => [h.ordinal, h])),
                textContents: mapTextContents(work, headsByOrd, parsByOrd),
                footnoteByRef: new Map(footnotes.map((f) => [f.ref, f])),
                summaryByRef: new Map(summaries.map((s) => [s.ref, s])),
              });
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                this.errorService.logError(err.error);
              } else if (err instanceof Error) {
                this.errorService.logErrorString(err.message);
              }
              return EMPTY;
            }
          )
        )
      )
    )
  );
  readonly navigateToSection = this.effect<number>((ordinal$) =>
    ordinal$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([ordinal, lang]) => {
        this.router.navigate(
          [`/${lang}/read/text`, this.get((state) => state.work?.code)],
          { fragment: `content-${ordinal.toString()}` }
        );
        return EMPTY;
      })
    )
  );
}

function mapTextContents(
  work: Work,
  headsByOrd: Map<number, Heading>,
  parsByOrd: Map<number, Paragraph>
): TextContent[] {
  let textContents: TextContent[] = [];
  for (const wOrd of work.paragraphs ?? []) {
    const p = parsByOrd.get(wOrd);
    if (!p) {
      throw new Error('no paragraph object with ID ' + wOrd);
    }
    textContents.push({
      isHeading: false,
      ordinal: p.ordinal,
      text: p.text,
      fnRefs: p.fnRefs,
      summaryRef: p.summaryRef,
    });
  }
  for (const s of work.sections) {
    textContents.push(...mapSection(s, headsByOrd, parsByOrd));
  }
  return textContents;
}

function mapSection(
  sec: Section,
  headsByOrd: Map<number, Heading>,
  parsByOrd: Map<number, Paragraph>
): TextContent[] {
  let textContents: TextContent[] = [];
  const h = headsByOrd.get(sec.heading);
  if (!h) {
    throw new Error('no heading object with ordinal ' + sec.heading);
  }
  textContents.push({
    isHeading: true,
    ordinal: h.ordinal,
    text: h.text,
    fnRefs: h.fnRefs,
    summaryRef: undefined,
  });

  for (const wOrd of sec.paragraphs ?? []) {
    const p = parsByOrd.get(wOrd);
    if (!p) {
      throw new Error('no paragraph object with ID ' + wOrd);
    }
    textContents.push({
      isHeading: false,
      ordinal: p.ordinal,
      text: p.text,
      fnRefs: p.fnRefs,
      summaryRef: p.summaryRef,
    });
  }

  for (const s of sec.sections ?? []) {
    textContents.push(...mapSection(s, headsByOrd, parsByOrd));
  }
  return textContents;
}
