import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, filter, tap } from 'rxjs';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TranslateService } from '@ngx-translate/core';
import { TitleUtil } from 'src/app/search/util/title-util';
import { Volume } from '@frhorschig/kant-search-api';

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
    this.init();
  }

  readonly nodes$ = this.select((state) => state.nodes);
  readonly ready$ = this.select((state) => state.nodes.length > 0);

  private readonly init = this.effect<void>((trigger$) =>
    combineLatest([
      trigger$,
      this.volStore.volumes$,
      this.langStore.ready$,
    ]).pipe(
      filter(([, , langReady]) => langReady),
      tap(([, vols]) => this.patchState({ nodes: this.createNodes(vols) }))
    )
  );

  private createNodes(vols: Volume[]): NzTreeNodeOptions[] {
    return vols.map((vol) => {
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
  }
}
