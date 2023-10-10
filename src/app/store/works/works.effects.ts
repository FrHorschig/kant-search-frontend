import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { ReadService } from 'kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class WorksEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWorks),
      mergeMap(() =>
        forkJoin([
          this.readService.getVolumes(),
          this.readService.getWorks(),
        ]).pipe(
          map(([volumes, works]) => {
            return loadWorksSuccess({ volumes, works });
          }),
          catchError((err: HttpErrorResponse) => {
            this.errorService.logError(err.error.message, err.error.args);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private errorService: ErrorService,
    private readService: ReadService
  ) {}
}
