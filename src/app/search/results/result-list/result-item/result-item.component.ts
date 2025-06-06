import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-result-item',
  templateUrl: './result-item.component.html',
  standalone: false,
})
export class ResultItemComponent {
  @Input() workCode = '';
  @Input() workAbbrev = '';
  @Input() index = 0;
  @Input() hit: Hit = { ordinal: 0, pages: [], snippets: [] };

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
