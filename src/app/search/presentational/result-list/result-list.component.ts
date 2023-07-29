import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent {
  @Input() isLoading = true;
  @Input() results: SearchResult[] | undefined;
  @Input() resultsCount = 0;
  @Input() searchTerms: string[] = [];

  @Output() onClick = new EventEmitter<Match>();

  onMatchClick(match: Match) {
    this.onClick.emit(match);
  }
}
