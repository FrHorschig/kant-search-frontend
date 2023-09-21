import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Work } from 'kant-search-api';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent {
  constructor(private readonly router: Router) {}

  showText(works: Work[]) {
    // works-menu component returns an array because it supports multiselect
    if (works.length > 0) {
      this.router.navigate(['/read/text', works[0].id]);
    }
  }
}
