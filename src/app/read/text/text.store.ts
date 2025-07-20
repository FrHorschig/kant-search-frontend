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
import { EMPTY, forkJoin, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { TextContent } from './model';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { Work } from 'src/app/common/model/model';
import { LanguageStore } from 'src/app/common/store/language.store';
import { Router } from '@angular/router';
import { ConfigStore } from 'src/app/app/config/config.store';
import { TranslateService } from '@ngx-translate/core';

interface TextState {
  work: Work | undefined;
  headingByOrdinal: Map<number, Heading>;
  textContents: TextContent[];
  footnoteByRef: Map<string, Footnote>;
  summaryByRef: Map<string, Summary>;
  ready: boolean;
}

@Injectable()
export class TextStore extends ComponentStore<TextState> {
  constructor(
    private readonly router: Router,
    private readonly errorService: ErrorService,
    private readonly translateService: TranslateService,
    private readonly configStore: ConfigStore,
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
      ready: false,
    });
  }

  readonly work$ = this.select((state) => state.work);
  readonly textContents$ = this.select((state) => state.textContents);
  readonly headingByOrdinal$ = this.select((state) => state.headingByOrdinal);
  readonly footnoteByRef$ = this.select((state) => state.footnoteByRef);
  readonly summaryByRef$ = this.select((state) => state.summaryByRef);
  readonly ready$ = this.select((state) => state.ready);

  readonly loadData = this.effect<string>((workCode$) =>
    workCode$.pipe(
      tap(() =>
        this.patchState({
          work: undefined,
          headingByOrdinal: new Map(),
          textContents: [],
          footnoteByRef: new Map(),
          summaryByRef: new Map(),
          ready: false,
        })
      ),
      withLatestFrom(this.volStore.workByCode$),
      switchMap(([workCode, workByCode]) =>
        forkJoin({
          headings: this.readService.getHeadings(workCode),
          footnotes: this.readService.getFootnotes(workCode),
          paragraphs: this.readService.getParagraphs(workCode),
          summaries: this.readService.getSummaries(workCode),
          korporaUrl: this.configStore.korporaUrl$.pipe(take(1)),
          _: this.langStore.ready$.pipe(take(1)),
        }).pipe(
          tapResponse(
            ({ headings, footnotes, paragraphs, summaries, korporaUrl }) => {
              const work = workByCode.get(workCode);
              if (!work) {
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
                summaries,
                korporaUrl
              );
              this.patchState({
                work,
                headingByOrdinal,
                textContents,
                footnoteByRef,
                summaryByRef,
              });
            },
            (err: Error) => {
              this.errorService.logError(err);
              return EMPTY;
            },
            () => this.patchState({ ready: true })
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
    summs: Summary[],
    korporaUrl: string
  ): [
    Map<number, Heading>,
    TextContent[],
    Map<string, Footnote>,
    Map<string, Summary>
  ] {
    heads.forEach(
      (h) =>
        (h.text = this.makeTextReplacements(
          h.text,
          work.volumeNumber,
          korporaUrl
        ))
    );
    const headByOrd = new Map(heads.map((h) => [h.ordinal, h]));
    pars.forEach(
      (p) =>
        (p.text = this.makeTextReplacements(
          p.text,
          work.volumeNumber,
          korporaUrl
        ))
    );
    const parsByOrd = new Map(pars.map((p) => [p.ordinal, p]));
    const resultPars = this.mapTextContents(work, headByOrd, parsByOrd);
    fns.forEach(
      (f) =>
        (f.text = this.makeTextReplacements(
          f.text,
          work.volumeNumber,
          korporaUrl
        ))
    );
    const fnByRef = new Map(fns.map((f) => [f.ref, f]));
    summs.forEach(
      (s) =>
        (s.text = this.makeTextReplacements(
          s.text,
          work.volumeNumber,
          korporaUrl
        ))
    );
    const summByRef = new Map(summs.map((s) => [s.ref, s]));
    return [headByOrd, resultPars, fnByRef, summByRef];
  }

  private mapTextContents(
    work: Work,
    headsByOrd: Map<number, Heading>,
    parsByOrd: Map<number, Paragraph>
  ): TextContent[] {
    let textContents: TextContent[] = [];
    for (const word of work.paragraphs ?? []) {
      const p = parsByOrd.get(word);
      if (!p) {
        throw new Error('no paragraph object with ID ' + word);
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

  private makeTextReplacements(
    text: string,
    volNum: number,
    korporaUrl: string
  ): string {
    text = text.replaceAll('<ks-meta-page>', '<ks-meta-page>[');
    text = text.replaceAll('</ks-meta-page>', ']</ks-meta-page>');
    text = text.replaceAll('<ks-meta-fnref>', '<ks-meta-fnref>(');
    text = text.replaceAll('</ks-meta-fnref>', ')</ks-meta-fnref>');
    text = text.replaceAll('<ks-fmt-table>', '<table>');
    text = text.replaceAll('</ks-fmt-table>', '</table>');
    const name = this.translateService.instant('COMMON.IMAGE');
    return text.replace(
      /<ks-meta-imgref\s+[^>]*src=["']([^"']+)["'][^>]*desc=["']([^"']*)["'][^>]*\/>/g,
      (_match, src, _desc) => {
        const vol = volNum.toString().padStart(2, '0');
        const fullUrl = `${korporaUrl}/aa${vol}/Bilder/${src}`;
        return `<a href="${fullUrl}" onclick="window.open('${fullUrl}', 'popup', 'width=600,height=400,resizable=yes,scrollbars=yes'); return false;">${name} &#x29c9;</a>`;
      }
    );
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
