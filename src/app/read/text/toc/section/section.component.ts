import { Component, Input } from '@angular/core';
import { Section } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-toc-section',
  templateUrl: './section.component.html',
})
export class TocSectionComponent {
  @Input() level: number = 0;
  @Input() section: Section | undefined;
  @Input() headById: Map<string, string> | null = new Map();

  getHeading(id: string | undefined): string {
    const heading = this.headById?.get(id || '');
    if (!heading) {
      console.error('heading with id ' + id + ' not found');
      return '';
    }
    return heading;
  }
}
