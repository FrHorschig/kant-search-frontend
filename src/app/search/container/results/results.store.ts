import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SearchCriteria, SearchResult, SearchService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, switchMap, tap } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';

interface ResultsState {
  results: SearchResult[];
  isLoaded: boolean;
}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor(
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService,
    private readonly searchService: SearchService
  ) {
    super({ results: [], isLoaded: false });
  }

  readonly searchParagraphs = this.effect<SearchCriteria>((criteria$) =>
    criteria$.pipe(
      tap(() => this.messageService.clear()),
      tap(() => this.patchState({ results: [], isLoaded: false })),
      switchMap((criteria) =>
        this.searchService.search(criteria).pipe(
          tapResponse(
            (result) => this.patchState({ results: result, isLoaded: true }),
            (err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.patchState({ isLoaded: true });
              } else {
                this.errorService.logError(err.message);
              }
              return EMPTY;
            }
          )
        )
      )
    )
  );

  readonly results$ = this.select((state) => state.results);
  readonly isLoaded$ = this.select((state) => state.isLoaded);
}
