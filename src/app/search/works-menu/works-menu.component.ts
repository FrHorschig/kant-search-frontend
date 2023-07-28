import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkMetadata } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { WorkTreeBuilderService } from 'src/app/common/service/work-tree-builder.service';

@Component({
  selector: 'app-works-menu',
  templateUrl: './works-menu.component.html',
  providers: [WorkTreeBuilderService],
})
export class WorksMenuComponent {
  @Output() onSelectionChange = new EventEmitter<WorkMetadata[]>();

  nodes: TreeNode[] = [];
  selection: TreeNode[] = [];

  @Input() set works(works: WorkMetadata[] | undefined) {
    if (!works) {
      return;
    }
    this.nodes = [];
    this.nodes.push({
      label: `All`, // TODO: i18n
      selectable: true,
      expanded: true,
      children: this.treeBuilder.buildTree(works),
    });
  }

  constructor(private readonly treeBuilder: WorkTreeBuilderService) {}

  onNodeSelect() {
    this.onSelectionChange.emit(this.getWorks());
  }

  onNodeUnselect() {
    this.onSelectionChange.emit(this.getWorks());
  }

  private getWorks(): WorkMetadata[] {
    const works: WorkMetadata[] = [];
    this.selection.forEach((node) => {
      if (node.data) {
        works.push(node.data);
      }
    });
    return works;
  }
}
