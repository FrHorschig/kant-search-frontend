import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';

@Component({
  selector: 'app-checkbox-works-menu',
  templateUrl: './checkbox-works-menu.component.html',
  providers: [WorksMenuStore],
})
export class CheckboxWorksMenuComponent {
  @Output() selectionChangeEmitter = new EventEmitter<Work[]>();

  nodes$ = this.store.nodes$;
  @ViewChild(Tree, { static: false }) tree: Tree | undefined;

  constructor(private readonly store: WorksMenuStore) {}

  onSelectAll() {
    if (this.tree && this.tree.value) {
      this.tree.selection = this.getRecursiveSelection(this.tree.value);
    }
  }

  onRemoveAll() {
    if (this.tree) {
      this.tree.selection = [];
    }
  }

  onSelectionChange(selection: TreeNode[]) {
    this.selectionChangeEmitter.emit(this.getSelectedWorks(selection));
  }

  private getSelectedWorks(node: TreeNode[]): Work[] {
    const works: Work[] = [];
    node.forEach((node) => {
      if (node.data) {
        works.push(node.data);
      } else {
        works.push(...this.getSelectedWorks(node.children || []));
      }
    });
    return works;
  }

  getRecursiveSelection(node: TreeNode[]): TreeNode[] {
    const selectedNodes: TreeNode[] = [];
    node.forEach((node) => {
      if (node.children) {
        selectedNodes.push(...this.getRecursiveSelection(node.children));
      }
      selectedNodes.push(node);
    });
    return selectedNodes;
  }
}
