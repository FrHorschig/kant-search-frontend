import { Component, Input } from '@angular/core';
import { Summary } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-summary',
  templateUrl: './summary.component.html',
  standalone: false,
})
export class SummaryComponent {
  @Input() summary: Summary | undefined;
}
