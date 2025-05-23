import { Component } from '@angular/core';
import { Work } from '@frhorschig/kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { WorksStore } from 'src/app/store/works/works.store';
import { SearchOptions } from '../../model/search-output';
import { SelectionGroup } from '../../model/selection-group';
import { SearchStore } from './search.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [WorksMenuStore, SearchStore],
})
export class SearchComponent extends ContainerComponent {
  works$ = this.worksStore.works$;
  selectionGroup$ = this.searchStore.selectionGroup$;
  canSearch$ = this.searchStore.canSearch$;
  nodes$ = this.worksMenuStore.nodes$;

  selectionGroupDefault = SelectionGroup.ALL;

  constructor(
    private readonly worksStore: WorksStore,
    private readonly worksMenuStore: WorksMenuStore,
    private readonly searchStore: SearchStore,
    private readonly messageService: MessageService,
  ) {
    super();
    this.worksMenuStore.buildNodes(true);
  }

  onWorksChange(works: Work[]) {
    this.searchStore.putWorks(works);
  }

  onSelectionGroupChange(group: SelectionGroup) {
    this.searchStore.putSelectionGroup(group);
  }

  onSearchStringChange(searchString: string) {
    this.searchStore.putSearchString(searchString);
  }

  onOptionsChange(options: SearchOptions) {
    this.searchStore.putOptions(options);
  }

  onSearch() {
    this.messageService.clear();
    this.searchStore.navigateSearch();
  }
}
