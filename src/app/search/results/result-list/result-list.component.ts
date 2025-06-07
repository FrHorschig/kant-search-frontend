import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit, SearchResult } from '@frhorschig/kant-search-api';
import { HitData } from '../../model/hit-data';
import { TitleUtil } from '../../util/title-util';
import { Work } from 'src/app/common/model/work';

@Component({
  selector: 'ks-result-list',
  templateUrl: './result-list.component.html',
  standalone: false,
})
export class ResultListComponent {
  @Input() workByCode: Map<string, Work> | null = null;
  @Input() results: SearchResult[] = [];

  @Output() onClick = new EventEmitter<HitData>();

  onMatchClick(code: string, hit: Hit, index: number) {
    const work = this.workByCode?.get(code);
    if (work) {
      this.onClick.emit({
        work,
        snippets: hit.snippets,
        text: '',
        ordinal: hit.ordinal,
        index,
      });
    } else {
      this.onClick.emit({
        work: {
          code: '',
          sections: [],
          ordinal: 0,
          title: '',
          volumeNumber: 0,
        },
        snippets: [],
        text: '',
        ordinal: hit.ordinal,
        index,
      });
      console.error("no work with code '" + code + "' exists");
    }
  }

  getWorkDividerText(code: string): string {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return this.titleCase(code);
    }
    return TitleUtil.getVolNoPlusTitle(work);
  }

  getWorkAbbreviation(code: string): string {
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
