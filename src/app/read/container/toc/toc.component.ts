import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Work } from 'kant-search-api';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent {
  constructor(private readonly router: Router) {}

  showText(work: Work) {
    this.router.navigate(['/read/text', work.id]);
  }
}
