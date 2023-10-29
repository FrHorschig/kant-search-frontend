import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
})
export class WorksMenuComponent {
  @Input() nodes: TreeNode[] = [];

  @Output() workSelectEmitter = new EventEmitter<Work>();
  @Output() expandableSelectEmitter = new EventEmitter<string>();

  selection: TreeNode[] = [];

  onNodeSelect(event: any) {
    this.workSelectEmitter.emit(event.node.data);
  }

  onClick(node: TreeNode) {
    this.expandableSelectEmitter.emit(node.key);
  }
}
