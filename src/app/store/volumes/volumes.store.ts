import { Injectable } from '@angular/core';
import { ReadService, Volume } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Work } from 'src/app/common/model/model';
import { ErrorService } from 'src/app/common/service/error.service';

interface VolumesState {
  volumes: Volume[];
  workByCode: Map<string, Work>;
  isLoaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class VolumesStore extends ComponentStore<VolumesState> {
  constructor(
    private errorService: ErrorService,
    private readService: ReadService
  ) {
    super({
      volumes: [],
      workByCode: new Map<string, Work>(),
      isLoaded: false,
    });
  }

  readonly volumes$ = this.select((state) => state.volumes);
  readonly workByCode$ = this.select((state) => state.workByCode);
  readonly isLoaded$ = this.select((state) => state.isLoaded);

  readonly loadData = this.effect<void>((dummy$) =>
    dummy$.pipe(
      tap(() =>
        this.patchState({ volumes: [], workByCode: new Map(), isLoaded: false })
      ),
      mergeMap(() =>
        this.readService.getVolumes().pipe(
          tapResponse(
            (volumes) => {
              this.patchState({
                volumes,
                workByCode: new Map<string, Work>(
                  volumes.flatMap((v) =>
                    v.works.map((w) => {
                      return [
                        w.code,
                        {
                          ...w,
                          volumeNumber: v.volumeNumber,
                          volumeTitle: v.title,
                        },
                      ];
                    })
                  )
                ),
                isLoaded: true,
              });
            },
            (err: Error) => {
              this.patchState({ isLoaded: true });
              this.errorService.logError(err);
              return EMPTY;
            }
          )
        )
      )
    )
  );
}
