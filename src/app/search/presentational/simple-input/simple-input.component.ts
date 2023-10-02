import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
})
export class SimpleInputComponent {
  @Input() nodes: TreeNode[] = [];

  @Output() worksChangeEmitter = new EventEmitter<Work[]>();
  @Output() searchStringChangeEmitter = new EventEmitter<string>();

  searchString = '';
  showWorksMenu = false;
  selectedWorksCount = 0;

  onWorksChange(works: Work[]) {
    this.selectedWorksCount = works.length;
    this.worksChangeEmitter.emit(works);
  }

  onSearchStringChange() {
    this.searchStringChangeEmitter.emit(this.searchString);
  }
}
