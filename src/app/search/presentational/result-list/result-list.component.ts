import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult, Work } from '@frhorschig/kant-search-api';
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
      workCode: this.getWorkAbbreviation(workId),
      match,
      index,
    });
  }

  getWorkTitle(workId: number): string {
    return this.workById?.get(workId)?.code ?? '';
  }

  getWorkAbbreviation(workId: number): string {
    return this.workById?.get(workId)?.abbreviation ?? '';
  }

  getAnchorId(workId: number, match: Match): string {
    return `match-${workId}-${match.paragraphId}${
      match.sentenceId ? '-' + match.sentenceId : ''
    }`;
  }
}
