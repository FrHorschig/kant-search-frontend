import { Component } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { SelectionStore } from './selection.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';

@Component({
    selector: 'ks-selection',
    templateUrl: './selection.component.html',
    providers: [SelectionStore],
    standalone: false
})
export class SelectionComponent extends ContainerComponent {
  volumes$ = this.volStore.volumes$;
  isLoaded$ = this.volStore.isLoaded$;

  constructor(
    private readonly volStore: VolumesStore,
    private readonly selectionStore: SelectionStore
  ) {
    super();
  }

  navigate(workId: string) {
    this.selectionStore.navigateToText(workId);
  }
}
