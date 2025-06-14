import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heading } from '@frhorschig/kant-search-api';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { emptyWork, Work } from 'src/app/common/model/model';
import { TocSectionComponent } from './section/section.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'ks-read-toc',
  templateUrl: './toc.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzDividerModule,
    TocSectionComponent,
  ],
})
export class TocComponent {
  @Input() work: Work = emptyWork;
  @Input() headByOrdinal: Map<number, Heading> | null = null;

  @Output() onClickEmitter = new EventEmitter<number>();

  onClick(ordinal: number) {
    this.onClickEmitter.emit(ordinal);
  }
}
