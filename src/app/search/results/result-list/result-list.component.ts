import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit, SearchResult } from '@frhorschig/kant-search-api';
import { HitData } from '../../model/hit-data';
import { TitleUtil } from '../../util/title-util';
import { Work } from 'src/app/common/model/work';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TranslateModule } from '@ngx-translate/core';
import { ResultItemComponent } from './result-item/result-item.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'ks-result-list',
  templateUrl: './result-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzSpaceModule,
    NzDividerModule,
    ResultItemComponent,
  ],
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

  getWorkVolume(code: string): number {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return 0;
    }
    return work.volumeNumber;
  }

  getWorkTitle(code: string): string {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return TitleUtil.titleCase(code);
    }
    return TitleUtil.truncate(work.title, 70);
  }

  getWorkAbbreviation(code: string): string {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return TitleUtil.titleCase(code);
    }
    return work.abbreviation ? work.abbreviation : TitleUtil.titleCase(code);
  }

  getAnchorId(workCode: string, hitOrdinal: number): string {
    return `match-${workCode}-${hitOrdinal}`;
  }
}
