import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksReducers } from 'src/app/store/works';
import { SearchStore } from './search.store';
import { Work } from 'kant-search-api';
import { SearchOptions } from '../../model/search-output';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchStore],
})
export class SearchComponent extends ContainerComponent {
  works$ = this.store.select(WorksReducers.selectWorks);
  canSearch$ = this.searchStore.canSearch;

  constructor(
    private readonly store: Store,
    private readonly searchStore: SearchStore
  ) {
    super();
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
    this.searchStore.navigateSearch();
  }
}
