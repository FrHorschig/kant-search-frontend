import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Work } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { selectWorks } from 'src/app/common/global-store/works.reducer';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent extends ContainerComponent {
  works$ = this.store.select(selectWorks);

  constructor(private readonly router: Router, private readonly store: Store) {
    super();
  }

  showText(works: Work[]) {
    this.router.navigate(['/read/text', works[0].id]);
  }
}
