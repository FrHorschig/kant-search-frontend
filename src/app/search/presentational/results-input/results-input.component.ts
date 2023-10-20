import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-results-input',
  templateUrl: './results-input.component.html',
})
export class ResultsInputComponent {
  @Input() searchString = '';

  @Output() onUpdateEmitter = new EventEmitter<string>();

  onSearchUpdate() {
    this.onUpdateEmitter.emit(this.searchString);
  }
}
