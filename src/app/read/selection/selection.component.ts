import { Component } from '@angular/core';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ks-selection',
  templateUrl: './selection.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, NzSpaceModule, NzTreeModule],
})
export class SelectionComponent extends SubscriptionComponent {
  volumes$ = this.volStore.volumes$;
  isLoaded$ = this.volStore.isLoaded$;

  nodes$: Observable<NzTreeNodeOptions[]> = combineLatest([
    this.volumes$,
    this.langStore.ready$,
  ]).pipe(
    filter(([_, ready]) => ready),
    map(([vols, _]) =>
      vols.map((vol) => {
        const children = vol.works.map((work) => {
          return {
            title: work.title,
            key: work.code,
            isLeaf: true,
            selectable: false,
          };
        });
        return {
          title: this.translateService.instant('COMMON.VOL_WORK_TITLE', {
            volumeNumber: vol.volumeNumber,
            title: vol.title,
          }),
          key: `volume-${vol.volumeNumber}`,
          children: children,
          selectable: false,
        };
      })
    )
  );
  expandedKeys: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore
  ) {
    super();
  }

  onNodeClick(event: NzFormatEmitEvent) {
    const key = event.node?.key ?? '';
    if (key.startsWith('volume-')) {
      const set = new Set(this.expandedKeys);
      if (set.has(key)) {
        set.delete(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(false);
      } else {
        set.add(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(true);
      }
    } else {
      this.langStore.currentLanguage$
        .pipe(this.takeUntilDestroy())
        .subscribe((lang) => this.router.navigate([`/${lang}/read/text`, key]));
    }
  }
}
