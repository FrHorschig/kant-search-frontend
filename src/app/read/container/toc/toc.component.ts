import { Component } from '@angular/core';
import { Work } from 'kant-search-api';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { TocStore } from './toc.store';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  providers: [WorksMenuStore, TocStore],
})
export class TocComponent {
  nodes$ = this.worksMenuStore.nodes$;

  constructor(
    private readonly store: TocStore,
    private readonly worksMenuStore: WorksMenuStore
  ) {
    this.worksMenuStore.buildNodes(false);
  }

  showText(work: Work) {
    this.store.navigateToText(work.id);
  }
}
