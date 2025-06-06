import { Component, Input } from '@angular/core';
import { Footnote, Summary } from '@frhorschig/kant-search-api';
import { TextContent } from '../../model';

@Component({
  selector: 'ks-paragraph',
  templateUrl: './paragraph.component.html',
  standalone: false,
})
export class ParagraphComponent {
  @Input() paragraph: TextContent = new TextContent(false, 0, '', [], '');
  @Input() fnByRef: Map<string, Footnote> | null = new Map();
  @Input() summByRef: Map<string, Summary> | null = new Map();

  getFn(ref: string): Footnote | undefined {
    const fn = this.fnByRef?.get(ref || '');
    if (!fn) {
      console.error('no footnote found from reference ' + ref);
      return undefined;
    }
    return fn;
  }

  getSummaryText(ref: string): string {
    const summary = this.summByRef?.get(ref || '');
    if (!summary) {
      console.error('no summary found from reference ' + ref);
      return '';
    }
    return summary.text;
  }
}
