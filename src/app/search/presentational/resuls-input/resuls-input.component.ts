import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resuls-input',
  templateUrl: './resuls-input.component.html',
})
export class ResulsInputComponent {
  @Input() searchString = '';

  @Output() onUpdateEmitter = new EventEmitter<string>();

  onSearchUpdate() {
    this.onUpdateEmitter.emit(this.searchString);
  }
}
