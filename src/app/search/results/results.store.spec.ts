import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchResult, SearchService } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { ResultsStore } from './results.store';
import { LanguageStore } from 'src/app/common/store/language.store';
import { Testdata } from 'src/app/common/test/testdata';
import { Hit, SearchResult as ResultInternal } from '../model/search-result';
import { MockLanguageStore } from 'src/app/common/store/language.store.spec';
import { createErrorServiceSpy } from 'src/app/common/test/services';
import { createSearchServiceSpy } from 'src/app/common/test/api-services';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { MockVolumesStore } from 'src/app/common/store/volumes.store.spec';

export class MockResultsStore {
  searchTerms$: Observable<string> = EMPTY;
  results$: Observable<ResultInternal[]> = EMPTY;
  hits$: Observable<Hit[]> = EMPTY;
  page$: Observable<number> = EMPTY;
  pageSize$: Observable<number> = EMPTY;
  ready$: Observable<boolean> = EMPTY;

  search = jasmine.createSpy('search');
  updateSearch = jasmine.createSpy('updateSearch');
  navigateToPage = jasmine.createSpy('navigateToPge ');
  navigateToSection = jasmine.createSpy('navigateToSection ');
  navigateToFullText = jasmine.createSpy('navigateToFullTxt ');
  putSearchTerms = jasmine.createSpy('putSearchTerms');
}

const workByCode = new Map(
  [Testdata.work, Testdata.work2].map((w) => [w.code, w])
);
const resultsInput: SearchResult[] = [
  {
    workCode: Testdata.work.code,
    hits: [
      {
        fmtText:
          'This <ks-meta-line>32</ks-meta-line> is a text of a paragraph <ks-meta-page>45</ks-meta-page><ks-meta-line>1</ks-meta-line>. A test <ks-meta-line>2</ks-meta-line> paragraph.',
        highlightText:
          'This is a text of a <ks-meta-hit>paragraph</ks-meta-hit>. A test <ks-meta-hit>paragraph</ks-meta-hit>.',
        lineByIndex: [
          { i: 5, num: 32 },
          { i: 93, num: 1 },
          { i: 132, num: 2 },
        ],
        ordinal: 3,
        pageByIndex: [{ i: 62, num: 45 }],
        pages: [45],
        wordIndexMap: {
          '0': 0,
          '5': 37,
          '8': 40,
          '10': 42,
          '15': 44,
          '18': 50,
          '20': 52,
          '31': 125,
          '33': 127,
          '38': 163,
        },
      },
      {
        fmtText:
          'Immanuel Kant was a prussian philosopher of the 18th century from Königsberg. His main work is the "Critic of pure Reason" from 1783/1787. His philosophy had a very large influence on philosophers after him.',
        highlightText:
          'Immanuel Kant was a prussian <ks-meta-hit>philosopher</ks-meta-hit> of the 18th century from Königsberg. His main work is the "Critic of pure Reason" from 1783/1787. His philosophy had a very large influence on <ks-meta-hit>philosophers</ks-meta-hit> after him.',
        lineByIndex: [],
        ordinal: 8,
        pageByIndex: [],
        pages: [87],
        wordIndexMap: {
          '0': 0,
          '9': 9,
          '14': 14,
          '18': 18,
          '20': 20,
          '29': 29,
          '41': 41,
          '44': 44,
          '48': 48,
          '53': 53,
          '61': 61,
          '66': 66,
          '76': 76,
          '78': 78,
          '82': 82,
          '87': 87,
          '92': 92,
          '95': 95,
          '100': 100,
          '107': 107,
          '110': 110,
          '115': 115,
          '123': 123,
          '139': 139,
          '143': 143,
          '154': 154,
          '158': 158,
          '160': 160,
          '165': 165,
          '171': 171,
          '181': 181,
          '184': 184,
          '197': 197,
          '203': 203,
        },
      },
    ],
  },
  {
    workCode: Testdata.work2.code,
    hits: [
      {
        fmtText: 'text',
        highlightText: '<ks-meta-hit>text</ks-meta-hit>',
        lineByIndex: [],
        ordinal: 9,
        pageByIndex: [],
        pages: [104],
        wordIndexMap: { '0': 0 },
      },
    ],
  },
];
const expectedResults: ResultInternal[] = [
  {
    workCode: Testdata.work.code,
    hits: [
      {
        snippets: [
          {
            page: 44,
            line: 32,
            text: 'This is a text of a <ks-meta-hit>paragraph</ks-meta-hit>. A test <ks-meta-hit>paragraph</ks-meta-hit>.',
            hasHighlights: true,
          },
        ],
        fmtTextWithHl:
          'This <ks-meta-line>32</ks-meta-line> is a text of a <ks-meta-hit>paragraph</ks-meta-hit> <ks-meta-page>45</ks-meta-page><ks-meta-line>1</ks-meta-line>. A test <ks-meta-line>2</ks-meta-line> <ks-meta-hit>paragraph</ks-meta-hit>.',
        ordinal: 3,
        index: 1,
        work: Testdata.work,
      },
      {
        snippets: [
          {
            page: 87,
            line: 1,
            text: 'Immanuel Kant was a prussian <ks-meta-hit>philosopher</ks-meta-hit> of the 18th century from Königsberg. His main work is the "Critic of',
            hasHighlights: true,
          },
          {
            page: 87,
            line: 1,
            text: 'Reason" from 1783/1787. His philosophy had a very large influence on <ks-meta-hit>philosophers</ks-meta-hit> after him.',
            hasHighlights: true,
          },
        ],
        fmtTextWithHl:
          'Immanuel Kant was a prussian <ks-meta-hit>philosopher</ks-meta-hit> of the 18th century from Königsberg. His main work is the "Critic of pure Reason" from 1783/1787. His philosophy had a very large influence on <ks-meta-hit>philosophers</ks-meta-hit> after him.',
        ordinal: 8,
        index: 2,
        work: Testdata.work,
      },
    ],
  },
  {
    workCode: Testdata.work2.code,
    hits: [
      {
        snippets: [
          {
            page: 104,
            line: 1,
            text: '<ks-meta-hit>text</ks-meta-hit>',
            hasHighlights: true,
          },
        ],
        fmtTextWithHl: '<ks-meta-hit>text</ks-meta-hit>',
        ordinal: 9,
        index: 3,
        work: Testdata.work2,
      },
    ],
  },
];

describe('ResultsStore', () => {
  let store: ResultsStore;
  let router: jasmine.SpyObj<Router>;
  let route: any = { queryParamMap: EMPTY };
  let errorService: jasmine.SpyObj<ErrorService>;
  let searchService: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    searchService = createSearchServiceSpy();
    errorService = createErrorServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        ResultsStore,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: ErrorService, useValue: errorService },
        { provide: LanguageStore, useValue: new MockLanguageStore() },
        { provide: VolumesStore, useValue: new MockVolumesStore() },
        { provide: SearchService, useValue: searchService },
      ],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
    });

    store = TestBed.inject(ResultsStore);
  });

  it('should map results', () => {
    const [results, hits]: [ResultInternal[], Hit[]] = store['mapResults'](
      'XYZ',
      resultsInput,
      workByCode
    );

    expect(results).toEqual(expectedResults);
    expect(hits).toEqual(expectedResults.flatMap((r) => r.hits));
  });

  it('should sort by year', () => {
    const [results, _]: [ResultInternal[], Hit[]] = store['mapResults'](
      'YEAR',
      resultsInput,
      workByCode
    );

    expect(results[0].workCode).toEqual(Testdata.work2.code);
    expect(results[1].workCode).toEqual(Testdata.work.code);
  });
});
