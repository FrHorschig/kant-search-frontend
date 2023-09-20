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
  private worksData$ = this.store.select(WorksReducers.selectIsLoaded).pipe(
    filter((isLoaded) => isLoaded),
    switchMap(() =>
      combineLatest([
        this.store.select(WorksReducers.selectWorks),
        this.store.select(WorksReducers.selectVolumeById),
      ])
    )
  );

  constructor(private readonly store: Store) {
    super({ nodes: [] });
  }

  readonly buildNodes = this.effect<boolean>((isSelectable$) =>
    isSelectable$.pipe(
      switchMap((isSelectable) =>
        this.worksData$.pipe(
          map(([works, volumeById]) =>
            this.createNodes(works, volumeById, isSelectable)
          )
        )
      )
    )
  );

  readonly nodes$ = this.select((state) => state.nodes);

  // TODO frhorsch: add i18n
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
        sectionNodes.push({
          key: `${currentSection}`,
          label: `Section ${currentSection}`,
          styleClass: 'font-bold',
          expanded: true,
          selectable: isSelectable,
          children: volumeNodes,
        });
        volumeNodes = [];
        currentSection = volume.section;
      }

      if (work.id !== currentVolume) {
        volumeNodes.push({
          key: `${currentSection}-${volume.id}`,
          label: `${volume.title}`,
          styleClass: 'font-bold',
          expanded: true,
          selectable: isSelectable,
          children: workNodes,
        });
        workNodes = [];
        currentVolume = work.id;
      }

      workNodes.push({
        key: `${currentSection}-${volume.id}-${work.id}`,
        label: `${work.abbreviation ? work.abbreviation + ': ' : ''}${
          work.title
        }${work.year ? ' (' + work.year + ')' : ''}`,
        styleClass: 'font-normal',
        selectable: isSelectable,
        data: work,
      });
    }
    return sectionNodes;
  }
}
