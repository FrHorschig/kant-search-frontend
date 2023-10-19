import { Component, Input } from '@angular/core';
import { Paragraph } from 'kant-search-api';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
})
export class TextComponent {
  @Input() paragraphs: Paragraph[] = [];
}
