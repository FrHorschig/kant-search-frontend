import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { WorksMenuStore } from './works-menu.store';
import { ContainerComponent } from '../../base/container.component';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
  providers: [WorksMenuStore],
})
export class WorksMenuComponent extends ContainerComponent {
  @Input() set useCheckbox(useCheckbox: boolean) {
    this.mode = useCheckbox ? 'checkbox' : 'single';
    this.store.buildNodes(useCheckbox);
  }
  @Output() selectionChangeEmitter = new EventEmitter<Work[]>();

  nodes$ = this.store.nodes$;
  mode = '';
  @ViewChild(Tree, { static: false }) tree: Tree | undefined;

  constructor(private readonly store: WorksMenuStore) {
    super();
  }

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

  onSelectionChange(selection: TreeNode) {
    this.selectionChangeEmitter.emit(this.getSelectedWorks(selection));
  }

  private getSelectedWorks(node: TreeNode): Work[] {
    if (node.data) {
      return [node.data];
    }
    const works: Work[] = [];
    node.children?.forEach((node) => {
      if (node.data) {
        works.push(node.data);
      } else {
        works.push(...this.getSelectedWorks(node));
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
