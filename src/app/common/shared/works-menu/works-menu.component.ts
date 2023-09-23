import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { WorksMenuStore } from './works-menu.store';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
  providers: [WorksMenuStore],
})
export class WorksMenuComponent {
  @Input() set isSelectable(isSelectable: boolean) {
    this.mode = isSelectable ? 'checkbox' : 'single';
    this.store.buildNodes(isSelectable);
  }
  @Output() onSelectionChange = new EventEmitter<Work[]>();

  nodes$ = this.store.nodes$;
  mode = '';
  selection: TreeNode[] = [];

  constructor(private readonly store: WorksMenuStore) {}

  onNodeSelect(event: any) {
    if (this.selection.length > 1) {
      this.onSelectionChange.emit(this.getSelectedWorks());
    } else {
      this.onSelectionChange.emit([event.node.data]);
    }
  }

  onNodeUnselect() {
    this.onSelectionChange.emit(this.getSelectedWorks());
  }

  private getSelectedWorks(): Work[] {
    const works: Work[] = [];
    this.selection.forEach((node) => {
      if (node.data) {
        works.push(node.data);
      }
    });
    return works;
  }
}
