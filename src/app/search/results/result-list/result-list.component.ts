import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Hit } from '../../model/search-result';
import { TitleUtil } from '../../../common/util/title-util';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
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
    NzPaginationModule,
    NzDividerModule,
    ResultItemComponent,
  ],
})
export class ResultListComponent {
  private _hits: Hit[] = [];
  @Input()
  set hits(hits: Hit[]) {
    this._hits = hits;
    this.updateHits();
  }
  get hits() {
    return this._hits;
  }

  private _page = 1;
  @Input()
  set page(page: number) {
    this._page = page;
    this.updateHits();
  }
  get page() {
    return this._page;
  }

  private _pageSize = 5;
  @Input()
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.updateHits();
  }
  get pageSize() {
    return this._pageSize;
  }

  paginatedHits: Hit[] = [];

  @Output() onClick = new EventEmitter<Hit>();
  @Output() pageChange = new EventEmitter<number>();

  onMatchClick(hit: Hit) {
    this.onClick.emit(hit);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  private updateHits() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    this.paginatedHits = this._hits.slice(start, end);
  }
}
