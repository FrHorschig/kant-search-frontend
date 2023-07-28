import { Component, Input } from '@angular/core';
import { SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input() results: SearchResult[] | undefined;
  @Input() searchTerms: string[] = [];
}
