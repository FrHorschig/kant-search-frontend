import { Component, Input } from '@angular/core';
import { Summary } from '@frhorschig/kant-search-api';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';

@Component({
  selector: 'ks-summary',
  templateUrl: './summary.component.html',
  standalone: true,
  imports: [TextBlockComponent],
})
export class SummaryComponent {
  @Input() summary: Summary | undefined;
}
