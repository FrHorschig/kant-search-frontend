import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Work } from 'kant-search-api';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  providers: [WorksMenuStore],
})
export class TocComponent {
  nodes$ = this.worksMenuStore.nodes$;

  constructor(
    private readonly router: Router,
    private readonly worksMenuStore: WorksMenuStore
  ) {
    this.worksMenuStore.buildNodes(false);
  }

  showText(work: Work) {
    this.router.navigate(['/read/text', work.id]);
  }
}
