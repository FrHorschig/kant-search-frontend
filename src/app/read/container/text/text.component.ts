import { Component, OnInit } from '@angular/core';
import { HttpError, Paragraph, ReadService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { PageRangeModel } from '../../model/page-range.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
})
export class TextComponent extends ContainerComponent implements OnInit {
  paragraphs: Paragraph[] | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly readService: ReadService
  ) {
    super();
  }

  ngOnInit(): void {
    const workId = this.route.snapshot.params['workId'] as number;
    const range = new PageRangeModel(workId, 0, 9999);
    this.messageService.clear();
    const strRange = `${range.start}-${range.end}`;
    this.readService
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
