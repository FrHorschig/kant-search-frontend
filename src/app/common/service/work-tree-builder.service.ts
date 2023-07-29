import { Injectable } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { TreeSelectionMode } from '../model/tree-selection-mode';

@Injectable({
  providedIn: 'root',
})
export class WorkTreeBuilderService {
  buildTree(works: Work[], allSelectable: boolean): TreeNode[] {
    const workByVolume = this.createWorkByVolume(works);
    return this.createNodes(workByVolume, allSelectable);
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

  private createNodes(
    worksByVolume: Map<number, Work[]>,
    allSelectable: boolean
  ): TreeNode[] {
    const nodes1: TreeNode[] = [];
    const nodes2: TreeNode[] = [];
    const nodes3: TreeNode[] = [];
    const sortedKeys = Array.from(worksByVolume.keys()).sort((a, b) => a - b);
    for (const key of sortedKeys) {
      let children: TreeNode[] = [];
      const works = worksByVolume.get(key);
      if (works) {
        children = this.createWorkNodes(works);
      }
      const node = {
        key: `${key}`,
        label: `Band ${key}`,
        styleClass: 'font-bold',
        selectable: allSelectable,
        expanded: true,
        children: children,
      };
      if (key < 10) {
        nodes1.push(node);
      } else if (key < 14) {
        nodes2.push(node);
      } else {
        nodes3.push(node);
      }
    }
    return this.createSectionNodes(nodes1, nodes2, nodes3, allSelectable);
  }

  private createWorkNodes(works: Work[]): TreeNode[] {
    const nodes: TreeNode[] = [];
    for (const work of works) {
      const label = `${work.abbreviation ? work.abbreviation + ': ' : ''}${
        work.title
      } ${work.year ? '(' + work.year + ')' : ''}`;
      nodes.push({
        key: `${work.volume}-${work.id}`,
        label: label,
        styleClass: 'font-normal',
        selectable: true,
        expanded: true,
        data: work,
      });
    }
    return nodes;
  }

  private createSectionNodes(
    nodes1: TreeNode[],
    nodes2: TreeNode[],
    nodes3: TreeNode[],
    allSelectable: boolean
  ): TreeNode[] {
    const nodes: TreeNode[] = [];
    nodes.push({
      key: 's1',
      label: 'WORKS.SECTIONS.WORKS',
      styleClass: 'font-bold',
      selectable: allSelectable,
      expanded: true,
      children: nodes1,
    });
    nodes.push({
      key: 's2',
      label: 'WORKS.SECTIONS.LETTERS',
      styleClass: 'font-bold',
      selectable: allSelectable,
      expanded: true,
      children: nodes2,
    });
    nodes.push({
      key: 's3',
      label: 'WORKS.SECTIONS.MANUSCRIPTS',
      styleClass: 'font-bold',
      selectable: allSelectable,
      expanded: true,
      children: nodes3,
    });
    return nodes;
  }
}
