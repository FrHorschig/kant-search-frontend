import { Component, Input } from '@angular/core';
import { Section } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-toc-section',
  templateUrl: './section.component.html',
  standalone: false,
})
export class TocSectionComponent {
  @Input() level: number = 0;
  @Input() section: Section | undefined;
  @Input() headByOrdinal: Map<number, string> | null = new Map();

  getHeading(ordinal: number | undefined): string {
    const heading = this.headByOrdinal?.get(ordinal || 0);
    if (!heading) {
      console.error('heading with ordinal ' + ordinal + ' not found');
      return '';
    }
    return heading;
  }
}
