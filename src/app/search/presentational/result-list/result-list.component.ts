import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult, Work } from 'kant-search-api';
import { WorkElementId } from '../../model/work-element-id';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent {
  @Input() workById: Map<number, Work> | null = null;
  @Input() result: SearchResult[] = [];
  @Input() resultCount = 0;
  @Input() searchTerms: string[] = [];

  @Output() onClick = new EventEmitter<Match>();

  onMatchClick(match: Match) {
    this.onClick.emit(match);
  }

  getWorkTitle(workId: number): string {
    return this.workById?.get(workId)?.title || '';
  }

  getVolume(workId: number): number {
    return this.workById?.get(workId)?.volumeId || 0;
  }
}
