import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpError, ReadService, Work } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
})
export class TocComponent extends ContainerComponent implements OnInit {
  works: Work[] | undefined;

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly readService: ReadService
  ) {
    super();
  }

  ngOnInit() {
    this.messageService.clear();
    this.readService
      .getWorks()
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

  showText(work: Work) {
    this.router.navigate(['/read/text', work.id]);
  }
}
