import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { AdvancedOptions } from '../model/search-options';
import { CriteriaStore } from './criteria.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';

@Component({
  selector: 'ks-criteria',
  templateUrl: './criteria.component.html',
  providers: [CriteriaStore],
  standalone: false,
})
export class CriteriaComponent extends ContainerComponent {
  volumes$ = this.volStore.volumes$;
  searchString$ = this.criteriaStore.searchTerms$;
  workCodes$ = this.criteriaStore.workCodes$;
  canSearch$ = this.criteriaStore.canSearch$;

  defaultCodeSet = new Set<string>();
  showWorksSelectDialog = false;

  constructor(
    private readonly messageService: MessageService,
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
    this.messageService.clear();
    this.criteriaStore.navigateSearch();
  }

  onOptionsChange(options: AdvancedOptions) {
    this.criteriaStore.putOptions(options);
  }
}
