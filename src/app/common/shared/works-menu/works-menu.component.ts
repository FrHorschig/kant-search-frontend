import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { WorkTreeBuilderService } from 'src/app/common/service/work-tree-builder.service';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
  providers: [WorkTreeBuilderService],
})
export class WorksMenuComponent {
  @Input() set selectionMode(selectionMode: string) {
    this.mode = selectionMode;
    this.buildNodes();
  }
  @Input() set works(works: Work[] | undefined) {
    if (!works) {
      return;
    }
    this._works = works;
    this.buildNodes();
  }

  @Output() onSelectionChange = new EventEmitter<Work[]>();

  _works: Work[] = [];
  mode = '';
  nodes: TreeNode[] = [];
  selection: TreeNode[] = [];

  constructor(private readonly treeBuilder: WorkTreeBuilderService) {}

  onNodeSelect(event: any) {
    if (this.selection.length > 1) {
      this.onSelectionChange.emit(this.getWorks());
    } else {
      this.onSelectionChange.emit([event.node.data]);
    }
  }

  onNodeUnselect() {
    this.onSelectionChange.emit(this.getWorks());
  }

  private buildNodes() {
    if (this._works.length > 0 && this.mode) {
      this.nodes = this.treeBuilder.buildTree(
        this._works,
        this.mode === 'checkbox'
      );
    }
  }

  private getWorks(): Work[] {
    const works: Work[] = [];
    this.selection.forEach((node) => {
      if (node.data) {
        works.push(node.data);
      }
    });
    return works;
  }
}
