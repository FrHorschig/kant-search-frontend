import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() works: Work[] | undefined;
  @Input() isSearchPermitted = false;

  @Output() onInput = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<Work[]>();
  @Output() onSearch = new EventEmitter<void>();

  searchTerms = '';

  onInputChange(event: any) {
    this.onInput.emit(event?.target?.value || '');
  }

  onSelectionChange(works: Work[]) {
    this.onSelect.emit(works);
  }

  onSearchClick() {
    this.onSearch.emit();
  }
}
