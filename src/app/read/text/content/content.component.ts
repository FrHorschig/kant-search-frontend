import { Component, Input } from '@angular/core';
import { Footnote, Summary } from '@frhorschig/kant-search-api';
import { TextContent } from '../model';

@Component({
  selector: 'ks-content',
  templateUrl: './content.component.html',
  standalone: false,
})
export class ContentComponent {
  @Input() contents: TextContent[] = [];
  @Input() fnByRef: Map<string, Footnote> | null = new Map();
  @Input() summByRef: Map<string, Summary> | null = new Map();
}
