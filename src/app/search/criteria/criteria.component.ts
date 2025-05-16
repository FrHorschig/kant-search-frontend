import { Component } from '@angular/core';
import { Work } from '@frhorschig/kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { SearchOptions } from '../model/search-output';
import { SelectionGroup } from '../model/selection-group';
import { CriteriaStore } from './criteria.store';

@Component({
  selector: 'ks-criteria',
  templateUrl: './criteria.component.html',
  providers: [CriteriaStore],
})
export class CriteriaComponent extends ContainerComponent {
  selectionGroup$ = this.criteriaStore.selectionGroup$;
  canSearch$ = this.criteriaStore.canSearch$;

  selectionGroupDefault = SelectionGroup.ALL;

  constructor(
    private readonly criteriaStore: CriteriaStore,
    private readonly messageService: MessageService
  ) {
    super();
  }

  onWorksChange(works: Work[]) {
    this.criteriaStore.putWorks(works);
  }

  onSelectionGroupChange(group: SelectionGroup) {
    this.criteriaStore.putSelectionGroup(group);
  }

  onSearchStringChange(searchString: string) {
    this.criteriaStore.putSearchString(searchString);
  }

  onOptionsChange(options: SearchOptions) {
    this.criteriaStore.putOptions(options);
  }

  onSearch() {
    this.messageService.clear();
    this.criteriaStore.navigateSearch();
  }
}
