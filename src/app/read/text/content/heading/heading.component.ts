import { Component, Input } from '@angular/core';
import { Footnote, Heading } from '@frhorschig/kant-search-api';
import { TextContent } from '../../model';

@Component({
  selector: 'ks-heading',
  templateUrl: './heading.component.html',
  standalone: false,
})
export class HeadingComponent {
  @Input() heading: TextContent = new TextContent(false, 0, '', [], '');
  @Input() fnByRef: Map<string, Footnote> | null = new Map();

  getFn(ref: string): Footnote | undefined {
    const fn = this.fnByRef?.get(ref || '');
    if (!fn) {
      console.error('no footnote found from reference ' + ref);
      return undefined;
    }
    return fn;
  }
}
