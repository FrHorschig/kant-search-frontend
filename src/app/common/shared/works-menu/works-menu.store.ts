import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Work, Volume } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { WorksReducers } from 'src/app/store/works';

interface WorksMenuState {
  nodes: TreeNode[];
}

@Injectable()
export class WorksMenuStore extends ComponentStore<WorksMenuState> {
  constructor(private readonly store: Store) {
    super({ nodes: [] });
  }

  readonly buildNodes = this.effect<boolean>((isSelectable$) =>
    isSelectable$.pipe(
      switchMap((isSelectable) =>
        this.store
          .select(WorksReducers.selectIsLoaded)
          .pipe(
            filter((isLoaded) => isLoaded),
            switchMap(() =>
              combineLatest([
                this.store.select(WorksReducers.selectWorks),
                this.store.select(WorksReducers.selectVolumeById),
              ])
            )
          )
          .pipe(
            map(([works, volumeById]) =>
              this.createNodes(works, volumeById, isSelectable)
            )
          )
      )
    )
  );

  readonly nodes$ = this.select((state) => state.nodes);

  private createNodes(
    works: Work[],
    volumeById: Map<number, Volume>,
    isSelectable: boolean
  ): TreeNode[] {
    var sectionNodes: TreeNode[] = [];
    var currentSection = 1;
    var volumeNodes: TreeNode[] = [];
    var currentVolume = 1;
    var workNodes: TreeNode[] = [];
    for (const work of works) {
      const volume = volumeById.get(work.volumeId);
      if (!volume) {
        continue;
      }
      if (volume.section !== currentSection) {
        sectionNodes.push(
          this.createSectionNode(currentSection, isSelectable, volumeNodes)
        );
        volumeNodes = [];
        currentSection = volume.section;
      }
      if (work.id !== currentVolume) {
        volumeNodes.push(
          this.createVolumeNode(currentSection, volume, isSelectable, workNodes)
        );
        workNodes = [];
        currentVolume = work.id;
      }
      workNodes.push(
        this.createWorkNode(currentSection, volume, work, isSelectable)
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
      label: `Section ${section}`, // TODO frhorsch: add i18n
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
      label: `${volume.title}`,
      styleClass: 'font-bold',
      expanded: true,
      selectable: isSelectable,
      children: workNodes,
    };
  }

  private createWorkNode(
    section: number,
    volume: Volume,
    work: Work,
    isSelectable: boolean
  ): TreeNode {
    return {
      key: `${section}-${volume.id}-${work.id}`,
      label: `${work.abbreviation ? work.abbreviation + ': ' : ''}
        ${work.title}${work.year ? ' (' + work.year + ')' : ''}`,
      styleClass: 'font-normal',
      selectable: isSelectable,
      data: work,
    };
  }
}
