import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpError, ReadService, Volume } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY, switchMap, tap, withLatestFrom } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/store/language/language.store';

interface SelectionState {
  volumes: Volume[];
  isLoaded: boolean;
}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore,
    private readonly errorService: ErrorService,
    private readonly readService: ReadService
  ) {
    super({ volumes: [], isLoaded: false });
  }

  readonly volumes$ = this.select((state) => state.volumes);
  readonly isLoaded$ = this.select((state) => state.isLoaded);

  readonly loadData = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoaded: false })),
      switchMap(() =>
        this.readService.getVolumes().pipe(
          tapResponse(
            (result) => this.patchState({ volumes: result, isLoaded: true }),
            (err: HttpErrorResponse) => {
              this.patchState({ isLoaded: true });
              const e = err.error as HttpError;
              if (e.code !== 404) {
                this.errorService.logError(err.error);
              }
              return EMPTY;
            }
          )
        )
      )
    )
  );
  readonly navigateToText = this.effect<string>((workId$) =>
    workId$.pipe(
      withLatestFrom(this.langStore.currentLanguage$),
      tap(([workId, lang]) => {
        this.router.navigate([`/${lang}/read/text`, workId]);
        return EMPTY;
      })
    )
  );
}
