import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit } from '@frhorschig/kant-search-api';

@Component({
    selector: 'ks-result-item',
    templateUrl: './result-item.component.html',
    standalone: false
})
export class ResultItemComponent {
  @Input() anchor = '';
  @Input() workCode = '';
  @Input() workAbbrev = '';
  @Input() index = 0;
  @Input() hit: Hit = { contentId: '', pages: [], snippets: [] };

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
