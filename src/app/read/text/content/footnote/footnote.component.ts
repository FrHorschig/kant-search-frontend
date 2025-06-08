import { Component, Input } from '@angular/core';
import { Footnote } from '@frhorschig/kant-search-api';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';

@Component({
  selector: 'ks-footnote',
  templateUrl: './footnote.component.html',
  standalone: true,
  imports: [NzFlexModule, TextBlockComponent],
})
export class FootnoteComponent {
  @Input() footnote: Footnote | undefined;
}
