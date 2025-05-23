import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit, SearchResult, Work, WorkRef } from '@frhorschig/kant-search-api';
import { HitMetadata } from '../../model/hit-metadata';

@Component({
    selector: 'ks-result-list',
    templateUrl: './result-list.component.html',
    standalone: false
})
export class ResultListComponent {
  @Input() workById: Map<string, WorkRef> | null = null;
  @Input() results: SearchResult[] = [];

  @Output() onClick = new EventEmitter<HitMetadata>();

  onMatchClick(workId: string, hit: Hit, index: number) {
    this.onClick.emit({
      workId,
      workCode: this.getWorkCode(workId),
      hit: hit,
      index,
    });
  }

  getWorkCode(workId: string): string {
    return this.workById?.get(workId)?.code ?? '';
  }

  getWorkAbbreviation(workId: string): string {
    // TODO implement using abbrev instead of code
    return this.workById?.get(workId)?.code ?? '';
  }

  getAnchorId(workId: string, hit: Hit): string {
    return `match-${workId}-${hit.contentId}`;
  }
}
