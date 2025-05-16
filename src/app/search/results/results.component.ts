import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { FullTextInfo } from '../model/full-text-info';
import { HitMetadata } from '../model/hit-metadata';
import { ResultsStore } from './results.store';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    providers: [ResultsStore, ScrollService],
    standalone: false
})
export class ResultsComponent
  extends ContainerComponent
  implements OnInit, AfterViewInit
{
  searchString$ = this.resultsStore.searchString$;
  results$ = this.resultsStore.results$;
  isLoaded$ = this.resultsStore.isLoaded$;

  showParagraph = false;
  metadata: HitMetadata = {
    workId: '',
    workCode: '',
    hit: { contentId: '', pages: [], snippets: [] },
    index: 0,
  };

  constructor(
    private readonly route: ActivatedRoute,
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

  onClick(metadata: HitMetadata) {
    this.metadata = metadata;
    this.showParagraph = true;
  }

  onUpdate(searchString: string) {
    this.resultsStore.updateSearch(searchString);
  }

  onFullTextNavigation(info: FullTextInfo) {
    this.resultsStore.navigateToFullText(info);
  }
}
