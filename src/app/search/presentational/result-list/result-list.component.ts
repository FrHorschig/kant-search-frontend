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

  getWorkCode(workId: number): string {
    let code = this.workById?.get(workId)?.code ?? '';
    if (code?.length > 40) {
      code = code.substring(0, 37) + '...';
    }
    return code;
  }

  getWorkAbbreviation(workId: number): string {
    const abbrev = this.workById?.get(workId)?.abbreviation;
    return abbrev ?? this.getWorkCode(workId) ?? '';
  }

  getAnchorId(workId: number, match: Match): string {
    return `match-${workId}-${match.paragraphId}${
      match.sentenceId ? '-' + match.sentenceId : ''
    }`;
  }
}
