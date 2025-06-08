import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heading } from '@frhorschig/kant-search-api';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Work } from 'src/app/common/model/work';
import { TocSectionComponent } from './section/section.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ks-read-toc',
  templateUrl: './toc.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzDividerModule,
    TocSectionComponent,
  ],
})
export class TocComponent {
  @Input() work: Work | null | undefined = null;
  @Input() headByOrdinal: Map<number, Heading> | null = null;

  @Output() onClickEmitter = new EventEmitter<number>();

  onClick(ordinal: number) {
    this.onClickEmitter.emit(ordinal);
  }
}
