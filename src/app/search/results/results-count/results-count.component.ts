import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TitleUtil } from '../../util/title-util';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SearchResult } from '../../model/search-result';

@Component({
  selector: 'ks-results-count',
  templateUrl: './results-count.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, NzFlexModule, NzCollapseModule],
})
export class ResultsCountComponent {
  @Input() results: SearchResult[] = [];

  @Output() onClickEmitter = new EventEmitter<string>();

  isCollapseActive = false;

  getTotalCount(): number {
    return this.results.reduce((acc, result) => acc + result.hits.length, 0);
  }

  getWorkTitle(title: string): string {
    return TitleUtil.truncate(title, 80);
  }

  onClick(workCode: string) {
    this.isCollapseActive = false;
    this.onClickEmitter.emit(workCode);
  }
}
