import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksReducers } from 'src/app/store/works';
import { SearchStore } from './search.store';
import { SearchCriteria, Work } from 'kant-search-api';
import { SearchInput } from '../../model/search-input';
import { SearchInputComponent } from '../../presentational/search-input/search-input.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchStore],
})
export class SearchComponent extends ContainerComponent {
  works$ = this.store.select(WorksReducers.selectWorks);
  hasWorks$ = this.searchStore.hasWorks;

  constructor(
    private readonly store: Store,
    private readonly searchStore: SearchStore
  ) {
    super();
  }

  onSelectionChange(works: Work[]) {
    this.searchStore.putWorks(works);
  }

  onSearch(input: SearchInput) {
    this.searchStore.navigateSearch(input);
  }
}
