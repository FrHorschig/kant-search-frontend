import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Work, Volume } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { EMPTY, combineLatest, filter, map, switchMap } from 'rxjs';
import {
  selectIsLoaded,
  selectVolumeById,
  selectWorks,
} from 'src/app/store/works/works.reducers';

interface WorksMenuState {
  nodes: TreeNode[];
}

@Injectable()
export class WorksMenuStore extends ComponentStore<WorksMenuState> {
  private worksData$ = this.store.select(selectIsLoaded).pipe(
    filter((isLoaded) => isLoaded),
    switchMap(() =>
      combineLatest([
        this.store.select(selectWorks),
        this.store.select(selectVolumeById),
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
