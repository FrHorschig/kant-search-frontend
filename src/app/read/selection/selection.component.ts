import { Component } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';
import { map, Observable } from 'rxjs';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'ks-selection',
  templateUrl: './selection.component.html',
  standalone: true,
  imports: [CommonModule, NzSpaceModule, NzTreeModule, NzCardModule],
})
export class SelectionComponent extends ContainerComponent {
  volumes$ = this.volStore.volumes$;
  isLoaded$ = this.volStore.isLoaded$;

  nodes$: Observable<NzTreeNodeOptions[]> = this.volumes$.pipe(
    map((vols) =>
      vols.map((vol) => {
        const children = vol.works.map((work) => {
          return {
            title: work.title,
            key: work.code,
            isLeaf: true,
          };
        });
        return {
          title: vol.title,
          // TODO add "Band X: " to this title, same for works selection tree
          key: `volume-${vol.volumeNumber}`,
          children: children,
        };
      })
    )
  );

  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore
  ) {
    super();
  }

  onNodeClick(event: NzFormatEmitEvent) {
    const key = event.node?.key ?? '';
    if (!key.startsWith('volume-')) {
      this.langStore.currentLanguage$
        .pipe(this.takeUntilDestroy())
        .subscribe((lang) => this.router.navigate([`/${lang}/read/text`, key]));
    }
  }
}
