import { Component, OnInit } from '@angular/core';
import {
  HttpError,
  Paragraph,
  ParagraphsService,
  WorkMetadata,
  WorksService,
} from 'kant-search-api';
import { SmartComponent } from 'src/app/common/base/smart.component';
import { PageRangeModel } from '../model/page-range.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
})
export class ReadComponent extends SmartComponent implements OnInit {
  works: WorkMetadata[] | undefined;
  paragraphs: Paragraph[] | undefined;

  constructor(
    private readonly messageService: MessageService,
    private readonly worksService: WorksService,
    private readonly paragraphsService: ParagraphsService
  ) {
    super();
  }

  ngOnInit() {
    this.messageService.clear();
    this.worksService
      .getWorkMetadata()
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: (works) => {
          this.works = works;
        },
        error: (err: HttpError) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `The works could not be fetched: ${err.message}`,
          });
        },
      });
  }

  loadWork(work: WorkMetadata) {
    const range = new PageRangeModel(work.id, 385, 463);
    this.loadParagraphs(range);
  }

  loadParagraphs(range: PageRangeModel) {
    this.messageService.clear();
    const strRange = `${range.start}-${range.end}`;
    this.paragraphsService
      .getParagraphs(range.workId, strRange)
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: (paragraphs) => {
          this.paragraphs = paragraphs;
        },
        error: (err: HttpError) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `The text could not be fetched: ${err.message}`,
          });
        },
      });
  }
}
