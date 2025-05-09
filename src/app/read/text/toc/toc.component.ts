import { Component, Input } from '@angular/core';
import { Work } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-read-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent {
  @Input() work: Work | null | undefined = null;
  @Input() headById: Map<string, string> | null = null;
}
