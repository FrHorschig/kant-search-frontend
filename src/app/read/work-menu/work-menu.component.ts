import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkMetadata } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-work-menu',
  templateUrl: './work-menu.component.html',
})
export class WorkMenuComponent {
  @Input() selectedWork: WorkMetadata | undefined;
  @Output() onSelection = new EventEmitter<WorkMetadata>();

  nodes: TreeNode[] = [];

  @Input() set works(works: WorkMetadata[] | undefined) {
    if (!works) {
      return;
    }
    const workByVolume = this.createWorkByVolume(works);
    this.nodes = this.createNodes(workByVolume);
  }

  onNodeSelect(event: any) {
    this.onSelection.emit(event.node.data);
  }

  private createWorkByVolume(
    works: WorkMetadata[]
  ): Map<number, WorkMetadata[]> {
    const workByVolume = new Map<number, WorkMetadata[]>();
    for (const work of works) {
      const arr = workByVolume.get(work.volume) || [];
      arr.push(work);
      workByVolume.set(work.volume, arr);
    }
    return workByVolume;
  }

  private createNodes(worksByVolume: Map<number, WorkMetadata[]>): TreeNode[] {
    const nodes: TreeNode[] = [];
    const sortedKeys = Array.from(worksByVolume.keys()).sort((a, b) => a - b);
    for (const key of sortedKeys) {
      let children: TreeNode[] = [];
      const works = worksByVolume.get(key);
      if (works) {
        children = this.createWorkNodes(works);
      }
      nodes.push({
        key: `${key}`,
        label: `Band ${key}`,
        selectable: false,
        children: children,
      });
    }
    return nodes;
  }

  private createWorkNodes(works: WorkMetadata[]): TreeNode[] {
    const nodes: TreeNode[] = [];
    for (const work of works) {
      nodes.push({
        key: `${work.volume}-${work.id}`,
        label: `${work.title} (${work.abbreviation})`,
        selectable: true,
        data: work,
      });
    }
    return nodes;
  }
}
