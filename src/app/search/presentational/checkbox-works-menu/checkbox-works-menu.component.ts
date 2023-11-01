import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Work } from '@frhorschig/kant-search-api';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';

@Component({
  selector: 'app-checkbox-works-menu',
  templateUrl: './checkbox-works-menu.component.html',
  providers: [WorksMenuStore],
})
export class CheckboxWorksMenuComponent {
  @Input() visible = false;
  @Input() nodes: TreeNode[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() selectionChangeEmitter = new EventEmitter<Work[]>();

  @ViewChild(Tree, { static: false }) tree: Tree | undefined;

  onSelectAll() {
    if (this.tree?.value) {
      this.tree.selection = this.getRecursiveSelection(this.tree.value);
      this.removeParialSelection(this.tree.value);
      this.onSelectionChange(this.tree?.selection || []);
    }
  }

  onRemoveAll() {
    if (this.tree) {
      this.tree.selection = [];
      this.removeParialSelection(this.tree.value);
      this.onSelectionChange([]);
    }
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSelectionChange(selection: TreeNode[]) {
    this.selectionChangeEmitter.emit(this.getSelectedWorks(selection));
  }

  private getSelectedWorks(node: TreeNode[]): Work[] {
    const works: Map<number, Work> = new Map();
    node.forEach((node) => {
      if (node.data) {
        works.set(node.data.id, node.data);
      } else {
        this.getSelectedWorks(node.children ?? []).forEach((work) => {
          works.set(work.id, work);
        });
      }
    });
    return Array.from(works.values());
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

  removeParialSelection(node: TreeNode[]): TreeNode[] {
    const selectedNodes: TreeNode[] = [];
    node.forEach((node) => {
      if (node.children) {
        this.removeParialSelection(node.children);
      }
      node.partialSelected = false;
    });
    return selectedNodes;
  }
}
