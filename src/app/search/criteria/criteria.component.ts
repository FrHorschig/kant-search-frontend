import { Component } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { AdvancedOptions } from '../model/search-options';
import { CriteriaStore } from './criteria.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BasicInputComponent } from './basic-input/basic-input.component';
import { AdvancedInputComponent } from './advanced-input/advanced-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ks-criteria',
  templateUrl: './criteria.component.html',
  providers: [CriteriaStore],
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceModule,
    BasicInputComponent,
    AdvancedInputComponent,
  ],
})
export class CriteriaComponent extends ContainerComponent {
  volumes$ = this.volStore.volumes$;
  canSearch$ = this.criteriaStore.canSearch$;
  searchString$ = this.criteriaStore.searchTerms$;
  workCodes$ = this.criteriaStore.workCodes$;
  options$ = this.criteriaStore.options$;

  defaultCodeSet = new Set<string>();
  showWorksSelectDialog = false;

  constructor(
    private readonly volStore: VolumesStore,
    private readonly criteriaStore: CriteriaStore
  ) {
    super();
  }

  onSearchTermsChange(searchTerms: string) {
    this.criteriaStore.putSearchTerms(searchTerms);
  }

  onWorkCodesChange(workCodes: string[]) {
    this.criteriaStore.putWorkCodes(workCodes);
  }

  onSearch() {
    this.criteriaStore.navigateSearch();
  }

  onOptionsChange(options: AdvancedOptions) {
    this.criteriaStore.putOptions(options);
  }
}
