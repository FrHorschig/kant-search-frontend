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
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { Work } from 'src/app/common/model/model';
import { LanguageStore } from 'src/app/common/store/language.store';
import { Router } from '@angular/router';

interface TextState {
  work: Work | undefined;
  headingByOrdinal: Map<number, Heading>;
  textContents: TextContent[];
  footnoteByRef: Map<string, Footnote>;
  summaryByRef: Map<string, Summary>;
}

@Injectable()
export class TextStore extends ComponentStore<TextState> {
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

  readonly loadData = this.effect<string>((workCode$) =>
    workCode$.pipe(
      withLatestFrom(this.volStore.workByCode$),
      switchMap(([workCode, workByCode]) =>
        forkJoin({
          headings: this.readService.getHeadings(workCode),
          footnotes: this.readService.getFootnotes(workCode),
          paragraphs: this.readService.getParagraphs(workCode),
          summaries: this.readService.getSummaries(workCode),
        }).pipe(
          tapResponse(
            ({ headings, footnotes, paragraphs, summaries }) => {
              const work = workByCode.get(workCode);
              if (!work) {
                // TODO use translatable message code
                throw new Error('no work with code ' + workCode + ' found');
              }
              const [
                headingByOrdinal,
                textContents,
                footnoteByRef,
                summaryByRef,
              ] = this.mapContents(
                work,
                headings,
                paragraphs,
                footnotes,
                summaries
              );
              this.patchState({
                work,
                headingByOrdinal,
                textContents,
                footnoteByRef,
                summaryByRef,
              });
              // TODO would this work?
              // this.patchState({
              //   work,
              //   ...this.mapContents(
              //     work,
              //     headings,
              //     paragraphs,
              //     footnotes,
              //     summaries
              //   ),
              // });
            },
            (err: Error) => {
              this.errorService.logError(err);
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
      })
    )
  );

  private mapContents(
    work: Work,
    heads: Heading[],
    pars: Paragraph[],
    fns: Footnote[],
    summs: Summary[]
  ): [
    Map<number, Heading>,
    TextContent[],
    Map<string, Footnote>,
    Map<string, Summary>
  ] {
    const headByOrd = new Map(heads.map((h) => [h.ordinal, h]));
    const parsByOrd = new Map(pars.map((p) => [p.ordinal, p]));
    const resultPars = this.mapTextContents(work, headByOrd, parsByOrd);
    const fnByRef = new Map(fns.map((f) => [f.ref, f]));
    const summByRef = new Map(summs.map((s) => [s.ref, s]));
    return [headByOrd, resultPars, fnByRef, summByRef];
  }

  private mapTextContents(
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
        fnRefs: p.fnRefs ?? [],
        summaryRef: p.summaryRef,
      });
    }
    for (const s of work.sections) {
      textContents.push(...this.mapSection(s, headsByOrd, parsByOrd));
    }
    return textContents;
  }

  private mapSection(
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
      fnRefs: h.fnRefs ?? [],
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
        fnRefs: p.fnRefs ?? [],
        summaryRef: p.summaryRef,
      });
    }

    for (const s of sec.sections ?? []) {
      textContents.push(...this.mapSection(s, headsByOrd, parsByOrd));
    }
    return textContents;
  }
}
