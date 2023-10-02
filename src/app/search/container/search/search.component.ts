import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksReducers } from 'src/app/store/works';
import { SearchStore } from './search.store';
import { Work } from 'kant-search-api';
import { SearchOptions } from '../../model/search-output';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [WorksMenuStore, SearchStore],
})
export class SearchComponent extends ContainerComponent {
  works$ = this.store.select(WorksReducers.selectWorks);
  canSearch$ = this.searchStore.canSearch$;
  nodes$ = this.worksMenuStore.nodes$;

  constructor(
    private readonly store: Store,
    private readonly worksMenuStore: WorksMenuStore,
    private readonly searchStore: SearchStore,
    private readonly messageService: MessageService
  ) {
    super();
    this.worksMenuStore.buildNodes(true);
  }

  onWorksChange(works: Work[]) {
    this.searchStore.putWorks(works);
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
