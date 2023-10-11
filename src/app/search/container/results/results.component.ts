import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteria, SearchScope } from 'kant-search-api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ResultsStore } from './results.store';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';
import { MatchInfo } from '../../model/match-info';
import { ScrollService } from 'src/app/read/service/scroll.service';
import { FullTextInfo } from '../../model/full-text-info';

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
  isLoading$ = this.resultsStore.isLoading$;

  showParagraph = false;
  matchInfo: MatchInfo = {
    workId: 0,
    workTitle: '',
    match: { snippet: '', text: '', pages: [], paragraphId: 0 },
    index: 0,
  } as MatchInfo;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly resultsStore: ResultsStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(this.takeUntilDestroy())
      .subscribe((params) => {
        const workIdsParam = params.get('workIds');
        const criteria: SearchCriteria = {
          workIds: workIdsParam ? workIdsParam.split(',').map(Number) : [],
          searchString: params.get('searchString') || '',
          options: {
            scope:
              params.get('scope') === 'SENTENCE'
                ? SearchScope.Sentence
                : SearchScope.Paragraph,
          },
        };
        this.resultsStore.searchParagraphs(criteria);
      });
  }

  ngAfterViewInit() {
    this.route.fragment.pipe(this.takeUntilDestroy()).subscribe((fragment) => {
      if (!!fragment) {
        this.scrollService.scrollToAnchor(fragment);
      }
    });
  }

  onClick(info: MatchInfo) {
    this.matchInfo = info;
    this.showParagraph = true;
  }

  onUpdate(searchString: string) {
    this.resultsStore.updateSearchString(searchString);
    this.resultsStore.updateSearch();
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }
}
