import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, SearchCriteria, SearchScope } from 'kant-search-api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ResultsStore } from './results.store';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';
import { MatchInfo } from '../../model/match-info';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore],
})
export class ResultsComponent extends ContainerComponent implements OnInit {
  workById$ = this.store.select(WorksReducers.selectWorkById);
  results$ = this.resultsStore.results$;
  isLoaded$ = this.resultsStore.isLoaded$;

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
    private readonly resultsStore: ResultsStore
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(this.takeUntilDestroy())
      .subscribe((params) => {
        const criteria: SearchCriteria = {
          workIds: params.get('workIds')?.split(',').map(Number) || [],
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

  onClick(info: MatchInfo) {
    this.matchInfo = info;
    this.showParagraph = true;
  }
}
