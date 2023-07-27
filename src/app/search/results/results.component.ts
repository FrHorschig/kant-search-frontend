import { Component, Input } from '@angular/core';
import { ParagraphResults } from 'kant-search-api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input() results: ParagraphResults | undefined;
}
