import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { tapResponse } from "@ngrx/operators";
import { Paragraph, ReadService } from "@frhorschig/kant-search-api";
import { MessageService } from "primeng/api";
import { EMPTY, switchMap, tap } from "rxjs";
import { ErrorService } from "src/app/common/service/error.service";

interface ReadState {
  paragraphs: Paragraph[];
}

@Injectable()
export class ReadStore extends ComponentStore<ReadState> {
  constructor(
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly readService: ReadService,
  ) {
    super({ paragraphs: [] });
  }

  readonly paragraphs$ = this.select((state) => state.paragraphs);
  readonly isLoaded$ = this.select((state) => state.paragraphs.length > 0);

  readonly loadParagraphs = this.effect<number>((workId$) =>
    workId$.pipe(
      tap(() => this.messageService.clear()),
      switchMap((workId) =>
        this.readService.getParagraphs(workId).pipe(
          tapResponse(
            (paragraphs) => this.patchState({ paragraphs }),
            (err: HttpErrorResponse) => {
              this.errorService.logError(err.error);
              return EMPTY;
            },
          ),
        ),
      ),
    ),
  );
}
