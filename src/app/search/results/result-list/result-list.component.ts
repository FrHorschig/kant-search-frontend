import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit, SearchResult } from '@frhorschig/kant-search-api';
import { HitMetadata } from '../../model/hit-metadata';
import { StringsUtil } from '../../util/strings-util';
import { WorkRef } from 'src/app/common/model/work-ref';

@Component({
  selector: 'ks-result-list',
  templateUrl: './result-list.component.html',
  standalone: false,
})
export class ResultListComponent {
  @Input() workByCode: Map<string, WorkRef> | null = null;
  @Input() results: SearchResult[] = [];

  @Output() onClick = new EventEmitter<HitMetadata>();

  onMatchClick(workCode: string, hit: Hit, index: number) {
    this.onClick.emit({
      workCode,
      hit: hit,
      index,
    });
  }

  getWorkDividerText(code: string): string {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return this.titleCase(code);
    }
    return `${work.volumbeNumber}: ${StringsUtil.truncate(work.title, 70)}`;
  }

  getWorkAbbreviation(code: string): string {
    // TODO implement using abbrev instead of code
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return this.titleCase(code);
    }
    return work.abbreviation ? work.abbreviation : this.titleCase(code);
  }

  getAnchorId(workCode: string, hitOrdinal: number): string {
    return `match-${workCode}-${hitOrdinal}`;
  }

  private titleCase(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
