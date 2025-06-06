import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { FullTextInfo } from '../model/full-text-info';
import { HitMetadata } from '../model/hit-metadata';
import { ResultsStore } from './results.store';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  providers: [ResultsStore, ScrollService],
  standalone: false,
})
export class ResultsComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  worksByCode$ = this.volStore.workByCode$;
  searchTerms$ = this.resultsStore.searchTerms$;
  results$ = this.resultsStore.results$;
  isLoaded$ = this.resultsStore.isLoaded$;

  showParagraph = false;
  metadata: HitMetadata = {
    workCode: '',
    hit: { ordinal: 0, pages: [], snippets: [] },
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

  onSearchTermsChange(searchTerms: string) {
    this.resultsStore.putSearchTerms(searchTerms);
  }

  onUpdate() {
    this.resultsStore.updateSearch();
  }

  onClick(metadata: HitMetadata) {
    this.metadata = metadata;
    this.showParagraph = true;
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }
}
