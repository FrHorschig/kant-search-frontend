import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextStore } from './text.store';
import { ScrollService } from '../../service/scroll.service';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  providers: [TextStore, ScrollService],
})
export class TextComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  paragraphs$ = this.store.paragraphs$;
  isLoaded$ = this.store.isLoaded$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: TextStore,
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
      if (fragment) {
        this.scrollService.scrollToAnchor(fragment);
      }
    });
  }
}
