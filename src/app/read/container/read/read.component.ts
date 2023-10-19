import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadStore } from './read.store';
import { ScrollService } from '../../../common/service/scroll.service';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  providers: [ReadStore, ScrollService],
})
export class ReadComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  paragraphs$ = this.store.paragraphs$;
  isLoaded$ = this.store.isLoaded$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: ReadStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit(): void {
    const workId = this.route.snapshot.params['workId'] as number;
    this.store.loadParagraphs(workId);
  }

  ngAfterViewInit() {
    this.route.fragment.pipe(this.takeUntilDestroy()).subscribe((fragment) => {
      if (!!fragment) {
        this.scrollService.scrollToAnchor(fragment);
      }
    });
  }
}
