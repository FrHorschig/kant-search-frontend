import { Component, Input } from '@angular/core';
import { Paragraph } from 'kant-search-api';

@Component({
  selector: 'app-original-mode',
  templateUrl: './original-mode.component.html',
})
export class OriginalModeComponent {
  @Input() paragraphs: Paragraph[] = [];
}
