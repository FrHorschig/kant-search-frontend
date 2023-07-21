import { Component, OnInit } from '@angular/core';
import {
  Paragraph,
  ParagraphsService,
  WorkMetadata,
  WorksService,
} from 'kant-search-api';
import { SmartComponent } from 'src/app/common/base/smart.component';
import { PageRangeModel } from '../model/page-range.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
})
export class ReadComponent extends SmartComponent implements OnInit {
  works: WorkMetadata[] | undefined;
  paragraphs: Paragraph[] | undefined;

  constructor(
    private readonly worksService: WorksService,
    private readonly paragraphsService: ParagraphsService
  ) {
    super();
  }

  ngOnInit() {
    this.worksService
      .getWorkMetadata()
      .pipe(this.takeUntilDestroy())
      .subscribe((works) => {
        this.works = works;
      });
  }

  loadWork(work: WorkMetadata) {
    const range = new PageRangeModel(work.id, 1, 3);
    this.loadParagraphs(range);
  }

  loadParagraphs(range: PageRangeModel) {
    const strRange = `${range.start}-${range.end}`;
    this.paragraphsService
      .getParagraphs(range.workId, strRange)
      .pipe(this.takeUntilDestroy())
      .subscribe((paragraphs) => (this.paragraphs = paragraphs));
  }
}
