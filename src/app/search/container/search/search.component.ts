import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpError, ReadService, Work } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent extends ContainerComponent implements OnInit {
  works: Work[] | undefined;

  searchTerms = '';
  selectedWorks: Work[] = [];

  isSearchPermitted = false;

  constructor(
    private readonly router: Router,
    private readonly readService: ReadService,
    private readonly messageService: MessageService
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

  onInput(searchTerms: string) {
    this.searchTerms = searchTerms;
    this.updateIsSearchPermitted();
  }

  onSelect(works: Work[]) {
    this.selectedWorks = works;
    this.updateIsSearchPermitted();
  }

  onSearch() {
    this.router.navigate(['/search/results'], {
      queryParams: {
        searchTerms: this.searchTerms.split(' ').join(','),
        workIds: this.selectedWorks?.map((work) => work.id).join(','),
      },
    });
  }

  private updateIsSearchPermitted() {
    this.isSearchPermitted =
      !!this.searchTerms && this.selectedWorks && this.selectedWorks.length > 0;
  }
}
