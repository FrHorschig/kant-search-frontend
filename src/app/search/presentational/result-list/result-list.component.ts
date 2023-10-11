import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult, Work } from 'kant-search-api';
import { MatchInfo } from '../../model/match-info';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent {
  @Input() workById: Map<number, Work> | null = null;
  @Input() results: SearchResult[] = [];

  @Output() onClick = new EventEmitter<MatchInfo>();

  onMatchClick(workId: number, match: Match, index: number) {
    this.onClick.emit({
      workId,
      workTitle: this.getWorkAbbreviation(workId),
      match,
      index,
    });
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

  getAnchorId(workId: number, match: Match): string {
    return `match-${workId}-${match.paragraphId}${
      match.sentenceId ? '-' + match.sentenceId : ''
    }`;
  }
}
