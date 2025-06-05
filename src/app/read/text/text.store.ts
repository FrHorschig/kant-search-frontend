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
  headingById: Map<string, string>;
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
      headingById: new Map(),
      textContents: [],
      footnoteByRef: new Map(),
      summaryByRef: new Map(),
    });
  }

  readonly work$ = this.select((state) => state.work);
  readonly textContents$ = this.select((state) => state.textContents);
  readonly headingById$ = this.select((state) => state.headingById);
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
              const headsById = new Map(headings.map((h) => [h.id, h]));
              const parsById = new Map(paragraphs.map((p) => [p.id, p]));
              this.patchState({
                work: work,
                headingById: new Map(headings.map((h) => [h.id, h.tocText])),
                textContents: mapTextContents(work, headsById, parsById),
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
  headsById: Map<string, Heading>,
  parsById: Map<string, Paragraph>
): TextContent[] {
  let textContents: TextContent[] = [];
  for (const s of work.sections) {
    textContents.push(...mapSection(s, headsById, parsById));
  }
  return textContents;
}

function mapSection(
  sec: Section,
  headsById: Map<string, Heading>,
  parsById: Map<string, Paragraph>
): TextContent[] {
  let textContents: TextContent[] = [];
  const h = headsById.get(sec.heading);
  if (!h) {
    throw new Error('no heading object with ID ' + sec.heading);
  }
  textContents.push(new TextContent(true, h.id, h.text, h.fnRefs, undefined));

  for (const pId of sec.paragraphs ?? []) {
    const p = parsById.get(pId);
    if (!p) {
      throw new Error('no paragraph object with ID ' + pId);
    }
    textContents.push(
      new TextContent(false, p.id, p.text, p.fnRefs, p.summaryRef)
    );
  }

  for (const s of sec.sections ?? []) {
    textContents.push(...mapSection(s, headsById, parsById));
  }
  return textContents;
}
