import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextStore } from './text.store';
import { ScrollService } from '../../common/service/scroll.service';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'ks-text',
    templateUrl: './text.component.html',
    providers: [TextStore, ScrollService],
    standalone: false
})
export class TextComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  work$ = this.store.work$;
  textContents$ = this.store.textContents$;
  headingById$ = this.store.headingById$;
  footnoteByRef$ = this.store.footnoteByRef$;
  summaryByRef$ = this.store.summaryByRef$;
  isLoaded$ = this.store.isLoaded$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: TextStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit(): void {
    const workId = this.route.snapshot.params['workId'];
    this.store.loadData(workId);
  }

  ngAfterViewInit() {
    combineLatest([this.route.fragment, this.isLoaded$])
      .pipe(this.takeUntilDestroy())
      .subscribe(([fragment, isLoaded]) => {
        if (fragment && isLoaded) {
          this.scrollService.scrollToAnchor(fragment);
        }
      });
  }
}
