import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SearchCriteria, SearchResult, SearchService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, switchMap, tap } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';

interface ResultsState {
  result: SearchResult[];
  resultCount: number;
  isLoaded: boolean;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly searchService: SearchService
  ) {
    super({ result: [], resultCount: 0, isLoaded: false });
  }

  readonly searchParagraphs = this.effect<SearchCriteria>((criteria$) =>
    criteria$.pipe(
      tap(() => this.messageService.clear()),
      tap(() => this.patchState({ result: [], isLoaded: false })),
      switchMap((criteria) =>
        this.searchService.search(criteria).pipe(
          tapResponse(
            (result) =>
              this.patchState({
                result: result,
                resultCount: result
                  .map((result) => result.matches.length)
                  .reduce((a, b) => a + b, 0),
                isLoaded: true,
              }),
            (err: HttpErrorResponse) => {
              this.errorService.logError(err.message);
              return EMPTY;
            }
          )
        )
      )
    )
  );

  readonly result$ = this.select((state) => state.result);
  readonly resultCount$ = this.select((state) => state.resultCount);
  readonly isLoaded$ = this.select((state) => state.isLoaded);
}
