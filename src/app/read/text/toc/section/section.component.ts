import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heading, Section } from '@frhorschig/kant-search-api';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ks-toc-section',
  templateUrl: './section.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, NzFlexModule],
})
export class TocSectionComponent {
  @Input() level: number = 0;
  @Input() section: Section | undefined;
  @Input() headByOrdinal: Map<number, Heading> | null = new Map();

  @Output() onClickEmitter = new EventEmitter<number>();

  getHeading(ordinal: number | undefined): Heading | undefined {
    const heading = this.headByOrdinal?.get(ordinal || 0);
    if (!heading) {
      // TODO use error service
      console.error('heading with ordinal ' + ordinal + ' not found');
      return undefined;
    }
    return heading;
  }

  onClick(ordinal: number) {
    this.onClickEmitter.emit(ordinal);
  }
}
