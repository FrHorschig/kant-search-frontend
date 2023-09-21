import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, SearchCriteria, SearchScope } from 'kant-search-api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ResultsStore } from './results.store';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore],
})
export class ResultsComponent extends ContainerComponent implements OnInit {
  workById$ = this.store.select(WorksReducers.selectWorkById);
  result$ = this.searchStore.result$;
  resultCount$ = this.searchStore.resultCount$;
  isLoaded$ = this.searchStore.isLoaded$;

  searchTerms: string[] = [];
  showParagraph = false;
  text = '';
  pages: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly searchStore: ResultsStore
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      if (!params) {
        return;
      }

      this.searchTerms = params.get('searchTerms')?.split(',') || [];
      const workIds = params.get('workIds')?.split(',').map(Number) || [];
      const scope =
        params.get('scope') === 'sentence'
          ? SearchScope.Sentence
          : SearchScope.Paragraph;
      const criteria: SearchCriteria = {
        searchTerms: this.searchTerms,
        workIds: workIds,
        scope: scope,
      };
      this.searchStore.searchParagraphs(criteria);
    });
  }

  onClick(match: Match) {
    this.text = match.text;
    this.pages = match.pages;
  }
}
