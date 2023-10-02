import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { UploadService, Work } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { EMPTY, switchMap, tap } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';

interface UploadState {
  workId: number;
  isLoading: boolean;
}

@Injectable()
export class UploadStore extends ComponentStore<UploadState> {
  constructor(
    private readonly uploadService: UploadService,
    private readonly messageService: MessageService,
    private readonly errorService: ErrorService
  ) {
    super({ workId: 0, isLoading: false });
  }

  readonly upload = this.effect<string>((text$) =>
    text$.pipe(
      tap(() => this.messageService.clear()),
      tap(() => this.patchState({ isLoading: true })),
      switchMap((text) =>
        this.uploadService
          .uploadWork({ workId: this.get((state) => state.workId), text })
          .pipe(
            tap(
              () => this.patchState({ workId: 0, isLoading: false }),
              tapResponse(
                () =>
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                  }),
                (err: HttpErrorResponse) => {
                  this.errorService.logError(err.error.message);
                  return EMPTY;
                }
              )
            )
          )
      )
    )
  );

  readonly putWork = this.updater((state, work: Work) => ({
    ...state,
    workId: work.id,
  }));

  readonly hasWorkId$ = this.select((state) => state.workId > 0);
  readonly isLoading$ = this.select((state) => state.isLoading);
}
