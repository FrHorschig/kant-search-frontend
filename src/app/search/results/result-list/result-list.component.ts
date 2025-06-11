import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit, SearchResult } from '../../model/search-result';
import { TitleUtil } from '../../util/title-util';
import { Work } from 'src/app/store/volumes/model';
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
  @Input() results: SearchResult[] = [];
  @Output() onClick = new EventEmitter<Hit>();

  onMatchClick(hit: Hit) {
    this.onClick.emit(hit);
  }

  getWorkTitle(title: string): string {
    return TitleUtil.truncate(title, 70);
  }
}
