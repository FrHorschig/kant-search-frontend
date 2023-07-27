import { Component, OnInit } from '@angular/core';
import {
  HttpError,
  ParagraphResults,
  ReadService,
  SearchCriteria,
  SearchService,
  WorkMetadata,
} from 'kant-search-api';
import { SmartComponent } from 'src/app/common/base/smart.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent extends SmartComponent implements OnInit {
  works: WorkMetadata[] | undefined;

  searchTerms: string = '';
  selectedWorks: WorkMetadata[] | undefined;
  searchResults: ParagraphResults | undefined;

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
      .getWorkMetadata()
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

  onWorkSelectionChange(works: WorkMetadata[]) {
    this.selectedWorks = works;
  }

  onSearch() {
    if (!this.selectedWorks || this.selectedWorks.length === 0) {
      return;
    }
    const criteria: SearchCriteria = {
      searchWords: this.searchTerms.split(' '),
      workIds: this.selectedWorks?.map((work) => work.id),
    };
    this.searchService
      .search(criteria)
      .pipe(this.takeUntilDestroy())
      .subscribe((results) => {
        this.searchResults = results;
      });
  }
}
