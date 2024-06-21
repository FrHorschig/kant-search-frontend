import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadService, Volume, Work } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ErrorService } from 'src/app/common/service/error.service';
import { SelectionGroup } from 'src/app/search/model/selection-group';

interface WorksState {
  volumes: Volume[];
  volumeById: Map<number, Volume>;
  works: Work[];
  workById: Map<number, Work>;
  worksBySection: Map<SelectionGroup, Work[]>;
  isLoaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class WorksStore extends ComponentStore<WorksState> {
  constructor(
    private errorService: ErrorService,
    private readService: ReadService,
  ) {
    super({
      volumes: [],
      volumeById: new Map<number, Volume>(),
      works: [],
      workById: new Map<number, Work>(),
      worksBySection: new Map<SelectionGroup, Work[]>(),
      isLoaded: false,
    });
  }

  readonly volumes$ = this.select((state) => state.volumes);
  readonly volumeById$ = this.select((state) => state.volumeById);
  readonly works$ = this.select((state) => state.works);
  readonly workById$ = this.select((state) => state.workById);
  readonly worksBySection$ = this.select((state) => state.worksBySection);
  readonly isLoaded$ = this.select((state) => state.isLoaded);

  readonly loadData = this.effect<void>((dummy$) =>
    dummy$.pipe(
      mergeMap(() =>
        forkJoin([
          this.readService.getVolumes(),
          this.readService.getWorks(),
        ]).pipe(
          tapResponse(
            ([volumes, works]) => {
              const volsById = new Map<number, Volume>(
                volumes.map((v) => [v.id, v]),
              );
              this.patchState({
                volumes,
                volumeById: volsById,
                works,
                workById: new Map<number, Work>(works.map((w) => [w.id, w])),
                worksBySection: this.getWorksBySection(works, volsById),
                isLoaded: true,
              });
            },
            (err: HttpErrorResponse) => {
              if (
                typeof err.error === 'object' &&
                ('code' in err.error ||
                  'message' in err.error ||
                  'params' in err.error)
              ) {
                this.errorService.logError(err.error);
              } else {
                this.errorService.logErrorString(err.message);
              }
              return EMPTY;
            },
          ),
        ),
      ),
    ),
  );

  private getWorksBySection(
    works: Work[],
    volumesById: Map<number, Volume>,
  ): Map<SelectionGroup, Work[]> {
    const worksBySection = new Map<SelectionGroup, Work[]>([
      [SelectionGroup.ALL, []],
      [SelectionGroup.SEC1, []],
      [SelectionGroup.SEC2, []],
      [SelectionGroup.SEC3, []],
    ]);
    works.forEach((work) => {
      worksBySection.get(SelectionGroup.ALL)?.push(work);
      const sec = volumesById.get(work.volumeId)?.section;
      if (sec == 1) {
        worksBySection.get(SelectionGroup.SEC1)?.push(work);
      } else if (sec == 2) {
        worksBySection.get(SelectionGroup.SEC2)?.push(work);
      } else if (sec == 3) {
        worksBySection.get(SelectionGroup.SEC3)?.push(work);
      }
    });
    return worksBySection;
  }
}
