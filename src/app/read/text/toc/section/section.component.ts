import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heading, Section } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-toc-section',
  templateUrl: './section.component.html',
  standalone: false,
})
export class TocSectionComponent {
  @Input() level: number = 0;
  @Input() section: Section | undefined;
  @Input() headByOrdinal: Map<number, Heading> | null = new Map();

  @Output() onClickEmitter = new EventEmitter<number>();

  getHeading(ordinal: number | undefined): Heading {
    const heading = this.headByOrdinal?.get(ordinal || 0);
    if (!heading) {
      console.error('heading with ordinal ' + ordinal + ' not found');
      return {
        ordinal: 0,
        text: '',
        tocText: '',
        pages: [],
        fnRefs: [],
      };
    }
    return heading;
  }

  onClick(ordinal: number) {
    this.onClickEmitter.emit(ordinal);
  }
}
