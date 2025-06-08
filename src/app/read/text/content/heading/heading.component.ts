import { Component, Input } from '@angular/core';
import { Footnote } from '@frhorschig/kant-search-api';
import { TextContent } from '../../model';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FootnoteComponent } from '../footnote/footnote.component';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';

@Component({
  selector: 'ks-heading',
  templateUrl: './heading.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceModule,
    NzTreeModule,
    NzCardModule,
    TextBlockComponent,
    FootnoteComponent,
  ],
})
export class HeadingComponent {
  @Input() heading: TextContent = {
    isHeading: true,
    ordinal: 0,
    text: '',
    fnRefs: [],
    summaryRef: '',
  };
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
