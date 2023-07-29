import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input() results: SearchResult[] | undefined;
  @Input() resultsCount = 0;
  @Input() searchTerms: string[] = [];
}
