import { TestBed } from '@angular/core/testing';
import { TextStore } from './text.store';
import {
  Footnote,
  Heading,
  Paragraph,
  ReadService,
  Summary,
} from '@frhorschig/kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';
import {
  createErrorServiceSpy,
  createTranslateServiceSpy,
} from 'src/app/common/test/services';
import { createReadServiceSpy } from 'src/app/common/test/api-services';
import { MockVolumesStore } from 'src/app/common/store/volumes.store.spec';
import { MockLanguageStore } from 'src/app/common/store/language.store.spec';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { LanguageStore } from 'src/app/common/store/language.store';
import { Testdata } from 'src/app/common/test/testdata';
import { EMPTY, Observable } from 'rxjs';
import { Work } from 'src/app/common/model/model';
import { TextContent } from './model';
import { MockConfigStore } from 'src/app/app/config/config.store.spec';
import { ConfigStore } from 'src/app/app/config/config.store';
import { TranslateService } from '@ngx-translate/core';

export class MockTextStore {
  work$: Observable<Work> = EMPTY;
  textContents$: Observable<TextContent[]> = EMPTY;
  headingByOrdinal$: Observable<Map<number, Heading>> = EMPTY;
  footnoteByRef$: Observable<Map<string, Footnote>> = EMPTY;
  summaryByRef$: Observable<Map<string, Summary>> = EMPTY;
  ready$: Observable<boolean> = EMPTY;

  loadData = jasmine.createSpy('loadData');
  navigateToSection = jasmine.createSpy('navigateToSection');
}

describe('TextStore', () => {
  let store: TextStore;
  let readService: jasmine.SpyObj<ReadService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let mockConfigStore: MockConfigStore;
  let mockVolumesStore: MockVolumesStore;
  let mockLanguageStore: MockLanguageStore;

  beforeEach(() => {
    readService = createReadServiceSpy();
    errorService = createErrorServiceSpy();
    translateService = createTranslateServiceSpy();
    mockConfigStore = new MockConfigStore();
    mockVolumesStore = new MockVolumesStore();
    mockLanguageStore = new MockLanguageStore();

    TestBed.configureTestingModule({
      providers: [
        TextStore,
        { provide: ReadService, useValue: readService },
        { provide: ErrorService, useValue: errorService },
        { provide: TranslateService, useValue: translateService },
        { provide: ConfigStore, useValue: mockConfigStore },
        { provide: VolumesStore, useValue: mockVolumesStore },
        { provide: LanguageStore, useValue: mockLanguageStore },
      ],
    });

    store = TestBed.inject(TextStore);
  });

  it('should map inputs', () => {
    const work = Testdata.work;
    work.paragraphs = [1];
    work.sections = [
      {
        heading: 2,
        paragraphs: [5],
        sections: [{ heading: 7, paragraphs: [8] }],
      },
    ];
    const headings: Heading[] = [
      { ordinal: 2, text: 'text', tocText: 'H1', pages: [23], fnRefs: ['fn1'] },
      { ordinal: 7, text: 'text', tocText: 'H2', pages: [44] },
    ];
    const paragraphs: Paragraph[] = [
      { ordinal: 1, text: 'P1' },
      { ordinal: 5, text: 'P2', fnRefs: ['fn2'], summaryRef: 's1' },
      { ordinal: 8, text: 'P3' },
    ];
    const footnotes: Footnote[] = [
      { ordinal: 3, ref: 'fn1', text: 'F1' },
      { ordinal: 6, ref: 'fn2', text: 'F2' },
    ];
    const summaries: Summary[] = [{ ordinal: 4, ref: 's1', text: 'S1' }];

    const [headByOrd, textContents, fnByRef, summByRef] = store['mapContents'](
      work,
      headings,
      paragraphs,
      footnotes,
      summaries,
      'korporaUrl'
    );

    expect(headByOrd).toHaveSize(2);
    expect(headByOrd.get(2)).toEqual(headings[0]);
    expect(headByOrd.get(7)).toEqual(headings[1]);
    expect(textContents).toEqual([
      {
        isHeading: false,
        ordinal: paragraphs[0].ordinal,
        text: paragraphs[0].text,
        fnRefs: paragraphs[0].fnRefs ?? [],
        summaryRef: paragraphs[0].summaryRef,
      },
      {
        isHeading: true,
        ordinal: headings[0].ordinal,
        text: headings[0].text,
        fnRefs: headings[0].fnRefs ?? [],
        summaryRef: undefined,
      },
      {
        isHeading: false,
        ordinal: paragraphs[1].ordinal,
        text: paragraphs[1].text,
        fnRefs: paragraphs[1].fnRefs ?? [],
        summaryRef: paragraphs[1].summaryRef,
      },
      {
        isHeading: true,
        ordinal: headings[1].ordinal,
        text: headings[1].text,
        fnRefs: headings[1].fnRefs ?? [],
        summaryRef: undefined,
      },
      {
        isHeading: false,
        ordinal: paragraphs[2].ordinal,
        text: paragraphs[2].text,
        fnRefs: paragraphs[2].fnRefs ?? [],
        summaryRef: paragraphs[2].summaryRef,
      },
    ]);
    expect(fnByRef).toHaveSize(2);
    expect(fnByRef.get('fn1')).toEqual(footnotes[0]);
    expect(fnByRef.get('fn2')).toEqual(footnotes[1]);
    expect(summByRef).toHaveSize(1);
    expect(summByRef.get('s1')).toEqual(summaries[0]);
  });
});
