import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchResult, Work } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TitleUtil } from '../../util/title-util';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'ks-results-count',
  templateUrl: './results-count.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, NzFlexModule, NzCollapseModule],
})
export class ResultsCountComponent {
  @Input() workByCode: Map<string, Work> | null = null;
  @Input() results: SearchResult[] = [];

  getTotalCount(): number {
    return this.results.reduce((acc, result) => acc + result.hits.length, 0);
  }

  getWorkTitle(code: string): string {
    const work = this.workByCode?.get(code);
    if (!work) {
      console.error("no work with code '" + code + "' exists");
      return TitleUtil.titleCase(code);
    }
    return TitleUtil.truncate(work.title, 75);
  }
}
