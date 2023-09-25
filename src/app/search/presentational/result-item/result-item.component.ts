import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from 'kant-search-api';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
})
export class ResultItemComponent {
  @Input() volume = 0;
  @Input() workTitle = '';
  @Input() match: Match = { snippet: '', text: '', pages: [], paragraphId: 0 };

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
