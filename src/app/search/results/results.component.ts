import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, take } from 'rxjs';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { FullTextInfo } from '../model/full-text-info';
import { HitData } from '../model/hit-data';
import { ResultsStore } from './results.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { SearchResult } from '@frhorschig/kant-search-api';
import { CommonModule } from '@angular/common';
import { ResultsInputComponent } from './results-input/results-input.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ParagraphDialogComponent } from './paragraph-dialog/paragraph-dialog.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore, ScrollService],
  standalone: true,
  imports: [
    CommonModule,
    ResultsInputComponent,
    ResultListComponent,
    ParagraphDialogComponent,
  ],
})
export class ResultsComponent extends ContainerComponent implements OnInit {
  worksByCode$ = this.volStore.workByCode$;
  searchTerms$ = this.resultsStore.searchTerms$;
  results$ = this.resultsStore.results$;
  isLoaded$ = this.resultsStore.isLoaded$;
  resultTextByOrdinal$ = this.resultsStore.resultTextByOrdinal$;

  showParagraph = false;
  hitData: HitData = {
    work: { code: '', sections: [], ordinal: 0, title: '', volumeNumber: 0 },
    snippets: [],
    text: '',
    ordinal: 0,
    index: 0,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly volStore: VolumesStore,
    private readonly resultsStore: ResultsStore,
    private readonly scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit() {
    this.resultsStore.searchParagraphs();
    combineLatest([this.route.fragment, this.isLoaded$])
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

  onClick(hitData: HitData) {
    this.hitData = hitData;
    this.resultTextByOrdinal$.pipe(take(1)).subscribe((textByOrdinal) => {
      this.hitData.text = textByOrdinal.get(hitData.ordinal) ?? '';
      this.showParagraph = true;
    });
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }
}
