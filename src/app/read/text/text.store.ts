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
  Work,
} from '@frhorschig/kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, forkJoin, switchMap, tap } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { TextContent } from './model';

interface ReadState {
  work: Work | undefined;
  headingByOrdinal: Map<number, string>;
  textContents: TextContent[];
  footnoteByRef: Map<string, Footnote>;
  summaryByRef: Map<string, Summary>;
}

@Injectable()
export class TextStore extends ComponentStore<ReadState> {
  constructor(
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly readService: ReadService
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
  readonly isLoaded$ = this.select((state) => state.textContents.length > 0);

  readonly loadData = this.effect<string>((workCode) =>
    workCode.pipe(
      tap(() => this.messageService.clear()),
      switchMap((workCode) =>
        forkJoin({
          work: this.readService.getWork(workCode),
          headings: this.readService.getHeadings(workCode),
          footnotes: this.readService.getFootnotes(workCode),
          paragraphs: this.readService.getParagraphs(workCode),
          summaries: this.readService.getSummaries(workCode),
        }).pipe(
          // TODO: load work first, and the rest in the background, while loading the paragraphs of the first section of the section of the linked paragraph first
          tapResponse(
            ({ work, headings, footnotes, paragraphs, summaries }) => {
              const headsByOrd = new Map(headings.map((h) => [h.ordinal, h]));
              const parsByOrd = new Map(paragraphs.map((p) => [p.ordinal, p]));
              this.patchState({
                work: work,
                headingByOrdinal: new Map(
                  headings.map((h) => [h.ordinal, h.tocText])
                ),
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
}

function mapTextContents(
  work: Work,
  headsByOrd: Map<number, Heading>,
  parsByOrd: Map<number, Paragraph>
): TextContent[] {
  let textContents: TextContent[] = [];
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
  textContents.push(
    new TextContent(true, h.ordinal, h.text, h.fnRefs, undefined)
  );

  for (const wOrd of sec.paragraphs ?? []) {
    const p = parsByOrd.get(wOrd);
    if (!p) {
      throw new Error('no paragraph object with ID ' + wOrd);
    }
    textContents.push(
      new TextContent(false, p.ordinal, p.text, p.fnRefs, p.summaryRef)
    );
  }

  for (const s of sec.sections ?? []) {
    textContents.push(...mapSection(s, headsByOrd, parsByOrd));
  }
  return textContents;
}
