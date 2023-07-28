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
  @Output() onSelection = new EventEmitter<Work>();

  nodes: TreeNode[] = [];

  @Input() set works(works: Work[] | undefined) {
    if (!works) {
      return;
    }
    this.nodes = this.treeBuilder.buildTree(works);
  }

  constructor(private readonly treeBuilder: WorkTreeBuilderService) {}

  onNodeSelect(event: any) {
    this.onSelection.emit(event.node.data);
  }
}
