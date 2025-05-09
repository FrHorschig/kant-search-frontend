import { Component, Input } from '@angular/core';
import { Footnote } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-footnote',
  templateUrl: './footnote.component.html',
})
export class FootnoteComponent {
  @Input() footnote: Footnote | undefined;
}
