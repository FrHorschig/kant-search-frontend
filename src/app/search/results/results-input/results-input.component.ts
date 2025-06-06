import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ks-results-input',
  templateUrl: './results-input.component.html',
  standalone: false,
})
export class ResultsInputComponent {
  @Input() searchTerms = '';

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() doUpdateEmitter = new EventEmitter<void>();

  onSearchTermsChange(searchTerms: string) {
    this.searchTermsEmitter.emit(searchTerms);
  }

  onSubmit() {
    this.doUpdateEmitter.emit();
  }
}
