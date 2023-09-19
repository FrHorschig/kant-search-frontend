import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match, SearchResult, Work } from 'kant-search-api';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
})
export class ResultItemComponent {
  @Input() volume = 0;
  @Input() workTitle = '';
  @Input() pages: number[] = [];
  @Input() snippet = '';

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
