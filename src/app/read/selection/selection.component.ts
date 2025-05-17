import { Component } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { SelectionStore } from './selection.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';

@Component({
  selector: 'ks-selection',
  templateUrl: './selection.component.html',
  standalone: false,
})
export class SelectionComponent extends ContainerComponent {
  currentLang$ = this.langStore.currentLanguage$;
  volumes$ = this.volStore.volumes$;
  isLoaded$ = this.volStore.isLoaded$;

  constructor(
    private readonly langStore: LanguageStore,
    private readonly volStore: VolumesStore
  ) {
    super();
  }
}
