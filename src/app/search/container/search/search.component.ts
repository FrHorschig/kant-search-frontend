import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksReducers } from 'src/app/store/works';
import { SearchStore } from './search.store';
import { Work } from 'kant-search-api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchStore],
})
export class SearchComponent extends ContainerComponent {
  works$ = this.store.select(WorksReducers.selectWorks);
  isSearchPermitted$ = this.searchStore.isSearchPermitted$;

  constructor(
    private readonly store: Store,
    private readonly searchStore: SearchStore
  ) {
    super();
  }

  onInput(searchTerms: string) {
    this.searchStore.putSearchTerms(searchTerms);
  }

  onSelect(works: Work[]) {
    this.searchStore.putWorks(works);
  }

  onSearch() {
    this.searchStore.navigateSearch();
  }
}
