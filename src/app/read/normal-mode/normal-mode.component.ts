import { Component, Input } from '@angular/core';
import { Paragraph } from 'kant-search-api';

@Component({
  selector: 'app-normal-mode',
  templateUrl: './normal-mode.component.html',
})
export class NormalModeComponent {
  @Input() paragraphs: Paragraph[] | undefined;
}
