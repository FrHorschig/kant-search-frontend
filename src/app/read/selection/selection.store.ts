import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, filter, tap } from 'rxjs';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TranslateService } from '@ngx-translate/core';
import { NzTreeUtil } from 'src/app/common/util/nz-tree-util';
import { LanguageStore } from 'src/app/common/store/language.store';
import { VolumesStore } from 'src/app/common/store/volumes.store';

interface SelectionState {
  nodes: NzTreeNodeOptions[];
  ready: boolean;
}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  constructor(
    private readonly translateService: TranslateService,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore
  ) {
    super({ nodes: [], ready: false });
    this.init();
  }

  readonly nodes$ = this.select((state) => state.nodes);
  readonly ready$ = this.select((state) => state.ready);

  private readonly init = this.effect<void>((trigger$) =>
    combineLatest([
      trigger$,
      this.volStore.volumes$,
      this.langStore.ready$,
    ]).pipe(
      filter(([, , langReady]) => langReady),
      tap(([, vols]) =>
        this.patchState({
          nodes: NzTreeUtil.createNodes(vols, 85, (volNum, volTitle) =>
            this.translateService.instant('COMMON.VOL_WORK_TITLE', {
              volumeNumber: volNum,
              title: volTitle,
            })
          ),
          ready: true,
        })
      )
    )
  );
}
