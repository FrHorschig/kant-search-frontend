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

  selection: TreeNode[] = [];

  constructor() {}

  onNodeSelect(event: any) {
    this.selectionChangeEmitter.emit(event.node.data);
  }
}
