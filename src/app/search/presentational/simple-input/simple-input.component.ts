import { Component, EventEmitter, Output } from '@angular/core';
import { Work } from 'kant-search-api';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
})
export class SimpleInputComponent {
  @Output() worksChangeEmitter = new EventEmitter<Work[]>();
  @Output() searchStringChangeEmitter = new EventEmitter<string>();

  showWorksMenu = false;
  selectedWorksCount = 0;

  onWorksChange(works: Work[]) {
    this.selectedWorksCount = works.length;
    this.worksChangeEmitter.emit(works);
  }

  onSearchStringChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchStringChangeEmitter.emit(target.value);
  }
}
