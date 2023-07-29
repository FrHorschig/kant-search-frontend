import { Component, Input } from '@angular/core';
import { Match, SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
})
export class ResultItemComponent {
  @Input() result: SearchResult = { volume: 0, workTitle: '', matches: [] };
  @Input() match: Match = { snippet: '', pages: [], matchId: 0 };
  @Input() searchTerms: string[] = [];
}
