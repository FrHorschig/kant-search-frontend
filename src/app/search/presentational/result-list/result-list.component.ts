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
    var title = this.workById?.get(workId)?.title || '';
    if (title?.length > 40) {
      title = title.substring(0, 37) + '...';
    }
    return title;
  }

  getWorkAbbreviation(workId: number): string {
    const abbrev = this.workById?.get(workId)?.abbreviation;
    return (abbrev ? abbrev : this.getWorkTitle(workId)) || '';
  }
}
