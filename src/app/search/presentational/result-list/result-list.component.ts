import { Component, Input } from '@angular/core';
import { SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent {
  @Input() results: SearchResult[] | undefined;
  @Input() resultsCount = 0;
  @Input() searchTerms: string[] = [];
}
