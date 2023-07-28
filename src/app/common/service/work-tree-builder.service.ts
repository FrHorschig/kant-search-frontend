import { Injectable } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class WorkTreeBuilderService {
  constructor() {}

  buildTree(works: Work[]): TreeNode[] {
    const workByVolume = this.createWorkByVolume(works);
    return this.createNodes(workByVolume);
  }

  private createWorkByVolume(works: Work[]): Map<number, Work[]> {
    const workByVolume = new Map<number, Work[]>();
    for (const work of works) {
      const arr = workByVolume.get(work.volume) || [];
      arr.push(work);
      workByVolume.set(work.volume, arr);
    }
    return workByVolume;
  }

  private createNodes(worksByVolume: Map<number, Work[]>): TreeNode[] {
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
        selectable: true,
        children: children,
      });
    }
    return nodes;
  }

  private createWorkNodes(works: Work[]): TreeNode[] {
    const nodes: TreeNode[] = [];
    for (const work of works) {
      const label = `${work.abbreviation}: ${work.title} ${
        work.year ? '(' + work.year + ')' : ''
      }`;
      nodes.push({
        key: `${work.volume}-${work.id}`,
        label: label,
        selectable: true,
        data: work,
      });
    }
    return nodes;
  }
}
