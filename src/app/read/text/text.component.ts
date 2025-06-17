import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextStore } from './text.store';
import { ScrollService } from '../../common/service/scroll.service';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TocComponent } from './toc/toc.component';
import { ContentComponent } from './content/content.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TocSectionComponent } from './work-info/work-info.component';
import { emptyWork } from 'src/app/common/model/model';

@Component({
  selector: 'ks-text',
  templateUrl: './text.component.html',
  providers: [TextStore, ScrollService],
  standalone: true,
  imports: [
    CommonModule,
    NzFlexModule,
    NzTypographyModule,
    NzIconModule,
    TocComponent,
    ContentComponent,
    TocSectionComponent,
  ],
})
export class TextComponent extends SubscriptionComponent implements OnInit {
  work$ = this.store.work$;
  textContents$ = this.store.textContents$;
  headingByOrdinal$ = this.store.headingByOrdinal$;
  footnoteByRef$ = this.store.footnoteByRef$;
  summaryByRef$ = this.store.summaryByRef$;
  ready$ = this.store.ready$;

  defaultWork = emptyWork;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: TextStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit(): void {
    const code = this.route.snapshot.params['workCode'];
    this.store.loadData(code);
    combineLatest([this.route.fragment, this.ready$])
      .pipe(this.takeUntilDestroy())
      .subscribe(([fragment, ready]) => {
        if (fragment && ready) {
          this.scrollService.scrollToAnchor(fragment);
        }
      });
  }

  onSectionNavigation(ordinal: number) {
    this.store.navigateToSection(ordinal);
  }
}
