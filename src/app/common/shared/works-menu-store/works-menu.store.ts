import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Work, Volume } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { WorksReducers } from 'src/app/store/works';

interface WorksMenuState {
  nodes: TreeNode[];
}

@Injectable()
export class WorksMenuStore extends ComponentStore<WorksMenuState> {
  constructor(private readonly store: Store) {
    super({ nodes: [] });
  }

  readonly buildNodes = this.effect<boolean>((isAllSelectable$) =>
    isAllSelectable$.pipe(
      switchMap((isSelectable) =>
        this.store.select(WorksReducers.selectIsLoaded).pipe(
          filter((isLoaded) => isLoaded),
          switchMap(() =>
            combineLatest([
              this.store.select(WorksReducers.selectWorks),
              this.store.select(WorksReducers.selectVolumeById),
            ])
          ),
          map(([works, volumeById]) =>
            this.createNodes(works, volumeById, isSelectable)
          ),
          tap((nodes) => this.patchState({ nodes }))
        )
      )
    )
  );
  readonly toggleNode = this.effect<string>((key$) =>
    key$.pipe(
      tap((key) => {
        const nodes = this.get().nodes;
        const node = this.findNodeByKey(nodes, key);
        if (node) {
          node.expanded = !node.expanded;
          this.patchState({ nodes });
        }
      })
    )
  );

  readonly nodes$ = this.select((state) => state.nodes);

  private createNodes(
    works: Work[],
    volumeById: Map<number, Volume>,
    isSelectable: boolean
  ): TreeNode[] {
    if (works.length === 0) {
      return [];
    }
    let volume = volumeById.get(works[0].volumeId);
    const sectionNodes: TreeNode[] = [];
    let currentSection = volume?.section ?? 0;
    let volumeNodes: TreeNode[] = [];
    let currentVolume = works[0].volumeId;
    let workNodes: TreeNode[] = [];

    for (const work of works) {
      if (!volume) {
        console.log('Error: no volume found for work ', work);
        continue;
      }

      if (currentVolume !== work.volumeId) {
        volumeNodes.push(
          this.createVolumeNode(currentSection, volume, isSelectable, workNodes)
        );
        workNodes = [];
        currentVolume = work.volumeId;
      }

      volume = volumeById.get(work.volumeId);
      if (!volume) {
        console.log('Error: no volume found for work ', work);
        continue;
      }

      if (currentSection !== volume.section) {
        sectionNodes.push(
          this.createSectionNode(currentSection, isSelectable, volumeNodes)
        );
        volumeNodes = [];
        currentSection = volume.section;
      }

      workNodes.push(this.createWorkNode(currentSection, work));
    }

    if (workNodes.length) {
      volumeNodes.push(
        this.createVolumeNode(currentSection, volume!, isSelectable, workNodes)
      );
    }
    if (volumeNodes.length) {
      sectionNodes.push(
        this.createSectionNode(currentSection, isSelectable, volumeNodes)
      );
    }
    return sectionNodes;
  }

  private createSectionNode(
    section: number,
    isSelectable: boolean,
    volumeNodes: TreeNode[]
  ): TreeNode {
    return {
      key: `${section}`,
      label: `COMMON.SECTION_${section}`,
      styleClass: 'font-bold',
      expanded: true,
      selectable: isSelectable,
      children: volumeNodes,
    };
  }

  private createVolumeNode(
    section: number,
    volume: Volume,
    isSelectable: boolean,
    workNodes: TreeNode[]
  ): TreeNode {
    return {
      key: `${section}-${volume.id}`,
      label: `Band ${volume.id}: ${volume.title}`,
      styleClass: 'font-normal',
      expanded: false,
      selectable: isSelectable,
      children: workNodes,
    };
  }

  private createWorkNode(section: number, work: Work): TreeNode {
    return {
      key: `${section}-${work.volumeId}-${work.id}`,
      label: `${work.abbreviation ? work.abbreviation + ': ' : ''}${
        work.title
      }${work.year ? ' (' + work.year + ')' : ''}`,
      styleClass: 'font-normal',
      selectable: true,
      data: work,
    };
  }

  private findNodeByKey(
    nodes: TreeNode<any>[],
    key: string
  ): TreeNode | undefined {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const child = this.findNodeByKey(node.children, key);
        if (child) {
          return child;
        }
      }
    }
    return undefined;
  }
}
