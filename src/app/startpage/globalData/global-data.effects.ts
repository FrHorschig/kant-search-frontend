import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as GlobalDataActions from './global-data.actions';
import { ReadService } from 'kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';

@Injectable()
export class GlobalDataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalDataActions.loadGlobalData),
      mergeMap(() =>
        forkJoin([
          this.readService.getVolumes(),
          this.readService.getWorks(),
        ]).pipe(
          map(([volumes, works]) => {
            return GlobalDataActions.globalDataLoaded({ volumes, works });
          }),
          catchError(() => {
            this.errorService.logError('Error while loading global data');
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
