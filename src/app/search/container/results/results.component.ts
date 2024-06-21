import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { WorksStore } from 'src/app/store/works/works.store';
import { FullTextInfo } from '../../model/full-text-info';
import { MatchInfo } from '../../model/match-info';
import { ResultsStore } from './results.store';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore, ScrollService],
})
export class ResultsComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  workById$ = this.worksStore.workById$;
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
    private readonly worksStore: WorksStore,
    private readonly resultsStore: ResultsStore,
    private readonly scrollService: ScrollService,
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
