import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TranslateService } from '@ngx-translate/core';
import { TitleUtil } from 'src/app/search/util/title-util';

interface SelectionState {
  nodes: NzTreeNodeOptions[];
}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  constructor(
    private readonly translateService: TranslateService,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore
  ) {
    super({ nodes: [] });
  }

  readonly nodes$ = this.select((state) => state.nodes);
  readonly ready$ = this.select((state) => state.nodes.length > 0);

  readonly init = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ nodes: [] })),
      switchMap(() =>
        combineLatest([this.volStore.volumes$, this.langStore.ready$]).pipe(
          filter(([_, langReady]) => langReady),
          map(([vols, _]) => {
            const nodes = vols.map((vol) => {
              const children = vol.works.map((work) => ({
                title: TitleUtil.truncate(work.title, 85),
                key: work.code,
                isLeaf: true,
                selectable: false,
              }));
              return {
                title: this.translateService.instant('COMMON.VOL_WORK_TITLE', {
                  volumeNumber: vol.volumeNumber,
                  title: vol.title,
                }),
                key: `volume-${vol.volumeNumber}`,
                children: children,
                selectable: false,
              };
            });
            return nodes;
          }),
          tap((nodes) => this.patchState({ nodes }))
        )
      )
    )
  );
}
