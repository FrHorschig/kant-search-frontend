import { Component, Input } from '@angular/core';
import { Footnote, Summary } from '@frhorschig/kant-search-api';
import { TextContent } from '../../model';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FootnoteComponent } from '../footnote/footnote.component';
import { SummaryComponent } from '../summary/summary.component';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { ErrorService } from 'src/app/common/service/error.service';

@Component({
  selector: 'ks-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.less',
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceModule,
    NzTreeModule,
    NzCardModule,
    TextBlockComponent,
    FootnoteComponent,
    SummaryComponent,
  ],
})
export class ParagraphComponent {
  @Input() paragraph: TextContent = {
    isHeading: false,
    ordinal: 0,
    text: '',
    fnRefs: [],
    summaryRef: '',
  };
  @Input() fnByRef: Map<string, Footnote> | null = new Map();
  @Input() summByRef: Map<string, Summary> | null = new Map();

  constructor(private readonly errService: ErrorService) {}

  getFn(ref: string): Footnote | undefined {
    const fn = this.fnByRef?.get(ref || '');
    if (!fn) {
      this.errService.logError(
        new Error('no footnote found from reference ' + ref)
      );
      return undefined;
    }
    return fn;
  }

  getSummary(ref: string): Summary | undefined {
    const summary = this.summByRef?.get(ref || '');
    if (!summary) {
      this.errService.logError(
        new Error('no summary found from reference ' + ref)
      );
      return undefined;
    }
    return summary;
  }
}
