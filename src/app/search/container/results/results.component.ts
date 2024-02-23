import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ResultsStore } from './results.store';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';
import { MatchInfo } from '../../model/match-info';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { FullTextInfo } from '../../model/full-text-info';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore, ScrollService],
})
export class ResultsComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  workById$ = this.store.select(WorksReducers.selectWorkById);
  searchString$ = this.resultsStore.searchString$;
  results$ = this.resultsStore.results$;
  isLoaded$ = this.resultsStore.isLoaded$;

  showParagraph = false;
  matchInfo: MatchInfo = {
    workId: 0,
    workCode: '',
    match: { snippet: '', text: '', pages: [], paragraphId: 0 },
    index: 0,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly resultsStore: ResultsStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit() {
    this.resultsStore.searchParagraphs();
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

  onClick(info: MatchInfo) {
    this.matchInfo = info;
    this.showParagraph = true;
  }

  onUpdate(searchString: string) {
    this.resultsStore.updateSearch(searchString);
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }
}
