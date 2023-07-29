import { Component, OnInit } from '@angular/core';
import {
  HttpError,
  ReadService,
  SearchCriteria,
  SearchResult,
  SearchService,
  Work,
} from 'kant-search-api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent extends ContainerComponent implements OnInit {
  works: Work[] | undefined;

  searchTerms: string = '';
  selectedWorks: Work[] = [];
  searchResults: SearchResult[] | undefined;
  resultsCount = 0;

  constructor(
    private readonly messageService: MessageService,
    private readonly readService: ReadService,
    private readonly searchService: SearchService
  ) {
    super();
  }

  ngOnInit() {
    this.messageService.clear();
    this.readService
      .getWorks()
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: (works) => {
          this.works = works;
        },
        error: (err: HttpError) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `The works could not be fetched: ${err.message}`,
          });
        },
      });
  }

  onWorkSelectionChange(works: Work[]) {
    this.selectedWorks = works;
  }

  onSearch() {
    if (!this.selectedWorks || this.selectedWorks.length === 0) {
      return;
    }
    const criteria: SearchCriteria = {
      searchTerms: this.searchTerms.split(' '),
      workIds: this.selectedWorks?.map((work) => work.id),
    };
    this.searchService
      .search(criteria)
      .pipe(this.takeUntilDestroy())
      .subscribe((results) => {
        this.searchResults = results;
        this.resultsCount = results
          .map((result) => result.matches.length)
          .reduce((a, b) => a + b, 0);
      });
  }
}
