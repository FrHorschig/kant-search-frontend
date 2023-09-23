import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult, Volume, Work } from 'kant-search-api';
import { MatchInfo } from '../../model/match-info';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent {
  @Input() workById: Map<number, Work> | null = null;
  @Input() result: SearchResult[] = [];
  @Input() resultCount = 0;

  @Output() onClick = new EventEmitter<MatchInfo>();

  onMatchClick(workId: number, match: Match) {
    this.onClick.emit({ workId, match } as MatchInfo);
  }

  getWorkTitle(workId: number): string {
    return this.workById?.get(workId)?.title || '';
  }

  getVolume(workId: number): number {
    return this.workById?.get(workId)?.volumeId || 0;
  }
}
