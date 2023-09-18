import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Work } from 'kant-search-api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { selectWorks } from 'src/app/store/works/works.reducers';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent {
  works$ = this.store.select(selectWorks);

  constructor(private readonly router: Router, private readonly store: Store) {}

  showText(works: Work[]) {
    // the works-menu component returns an array because it supports multiple selections
    this.router.navigate(['/read/text', works[0].id]);
  }
}
