import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult } from 'kant-search-api';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
})
export class ResultItemComponent {
  @Input() result: SearchResult = { volume: 0, workTitle: '', matches: [] };
  @Input() match: Match = { snippet: '', pages: [], workId: 0, elementId: 0 };
  @Input() searchTerms: string[] = [];

  @Output() onClick = new EventEmitter<Match>();

  onCardClick() {
    this.onClick.emit(this.match);
  }
}
