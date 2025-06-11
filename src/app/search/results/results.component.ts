import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { FullTextInfo } from '../model/full-text-info';
import { Hit } from '../model/search-result';
import { ResultsStore } from './results.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { SearchResult } from '@frhorschig/kant-search-api';
import { CommonModule } from '@angular/common';
import { ResultsInputComponent } from './results-input/results-input.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ParagraphDialogComponent } from './paragraph-dialog/paragraph-dialog.component';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ResultsCountComponent } from './results-count/results-count.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore, ScrollService],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzSpaceModule,
    NzFloatButtonModule,
    NzIconModule,
    NzToolTipModule,
    ResultsInputComponent,
    ResultsCountComponent,
    ResultListComponent,
    ParagraphDialogComponent,
  ],
})
export class ResultsComponent extends SubscriptionComponent implements OnInit {
  workByCode$ = this.volStore.workByCode$;
  searchTerms$ = this.resultsStore.searchTerms$;
  results$ = this.resultsStore.results$;
  ready$ = this.resultsStore.ready$;

  showParagraph = false;
  hit: Hit = {
    ordinal: 0,
    pages: [],
    snippets: [],
    text: '',
    index: 0,
    work: {
      code: '',
      sections: [],
      ordinal: 0,
      title: '',
      volumeNumber: 0,
      volumeTitle: '',
    },
  };
  showUpButton = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly volStore: VolumesStore,
    private readonly resultsStore: ResultsStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit() {
    this.resultsStore.search();
    combineLatest([this.route.fragment, this.ready$])
      .pipe(this.takeUntilDestroy())
      .subscribe(([fragment, isLoaded]) => {
        if (fragment && isLoaded) {
          this.scrollService.scrollToAnchor(fragment);
        }
      });
  }

  getResultCount(results: SearchResult[]): number {
    return results.flatMap((r) => r.hits).length;
  }

  onSearchTermsChange(searchTerms: string) {
    this.resultsStore.putSearchTerms(searchTerms);
  }

  onUpdate() {
    this.resultsStore.updateSearch();
  }

  onResultNavigation(workCode: string) {
    this.resultsStore.navigateToSection(workCode);
  }

  onClick(hitData: Hit) {
    this.hit = hitData;
    this.showParagraph = true;
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showUpButton = window.scrollY > 200;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
