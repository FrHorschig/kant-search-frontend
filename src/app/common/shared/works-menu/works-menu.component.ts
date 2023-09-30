import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
})
export class WorksMenuComponent {
  @Input() nodes: TreeNode[] = [];

  @Output() selectionChangeEmitter = new EventEmitter<Work>();

  constructor() {}

  onSelectionChange(selection: TreeNode[]) {
    this.selectionChangeEmitter.emit(selection[0].data);
  }
}
