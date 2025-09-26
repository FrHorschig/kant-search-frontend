import { Component, Input } from '@angular/core';
import { Footnote } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';

@Component({
  selector: 'ks-footnote',
  templateUrl: './footnote.component.html',
  styleUrl: './footnote.component.less',
  standalone: true,
  imports: [TranslateModule, NzFlexModule, TextBlockComponent],
})
export class FootnoteComponent {
  @Input() footnote: Footnote | undefined;

  scrollToFnRef(event: MouseEvent, ref: string | undefined) {
    event.preventDefault();
    if (!ref) return;
    const el = document.getElementById('fnref-' + ref);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#fnref-${ref}`);
    }
  }
}
