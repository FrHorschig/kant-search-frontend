import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HttpError,
  Match,
  ReadService,
  SearchCriteria,
  SearchResult,
  SearchService,
} from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent extends ContainerComponent implements OnInit {
  isLoading = true;
  results: SearchResult[] | undefined;
  resultsCount = 0;
  searchTerms: string[] = [];

  isParagraphShowing = false;
  paragraphText = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly readService: ReadService,
    private readonly searchService: SearchService,
    private readonly messageService: MessageService
  ) {
    super();
  }

  ngOnInit() {
    this.messageService.clear();
    this.route.queryParamMap.subscribe((params) => {
      if (!params) {
        return;
      }

      this.searchTerms = params.get('searchTerms')?.split(',') || [];
      const workIds = params.get('workIds')?.split(',').map(Number) || [];
      const searchCriteria: SearchCriteria = {
        searchTerms: this.searchTerms,
        workIds: workIds,
      };
      this.searchService
        .search(searchCriteria)
        .pipe(this.takeUntilDestroy())
        .subscribe({
          next: (results) => {
            this.isLoading = false;
            this.results = results;
            this.resultsCount = results
              .map((results) => results.matches.length)
              .reduce((a, b) => a + b, 0);
          },
          error: (err: HttpError) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `The search results could not be fetched: ${err.message}`,
            });
          },
        });
    });
  }

  onClick(match: Match) {
    this.messageService.clear();
    this.readService.getParagraph(match.workId, match.elementId).subscribe({
      next: (paragraph) => {
        this.isParagraphShowing = true;
        this.paragraphText = this.highlightMatches(
          paragraph.text,
          match.snippet
        );
      },
      error: (err: HttpError) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `The paragraph of the search match count not be fetched: ${err.message}`,
        });
      },
    });
  }

  private highlightMatches(text: string, snippet: string): string {
    const regex = /<b>(.*?)<\/b>/g;
    let match;
    let words: string[] = [];
    while ((match = regex.exec(snippet)) !== null) {
      words.push(match[1]);
    }

    for (let word of words) {
      let wordRegex = new RegExp(`\\b${word}\\b`, 'g');
      text = text.replace(wordRegex, `<b>${word}</b>`);
    }
    return text;
  }
}
