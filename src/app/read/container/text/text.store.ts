import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Paragraph, ReadService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, switchMap, tap } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';

interface TextState {
  paragraphs: Paragraph[];
}

@Injectable()
export class TextStore extends ComponentStore<TextState> {
  constructor(
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly readService: ReadService
  ) {
    super({ paragraphs: [] });
  }

  readonly loadParagraphs = this.effect<number>((workId$) =>
    workId$.pipe(
      tap(() => this.messageService.clear()),
      switchMap((workId) =>
        this.readService.getParagraphs(workId).pipe(
          tapResponse(
            (paragraphs) => this.patchState({ paragraphs }),
            (err: HttpErrorResponse) => {
              this.errorService.logError(err.error.message, err.error.args);
              return EMPTY;
            }
          )
        )
      )
    )
  );

  readonly paragraphs$ = this.select((state) => state.paragraphs);
  readonly isLoaded$ = this.select((state) => state.paragraphs.length > 0);
}
