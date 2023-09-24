import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ResultsStore } from './results.store';
import { SearchScope, SearchService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/common/service/error.service';
import { Testdata } from 'src/app/common/test/testdata';

describe('ResultsStore', () => {
  let store: ResultsStore;
  let mockSearchService: jasmine.SpyObj<SearchService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockErrorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    mockSearchService = jasmine.createSpyObj('SearchService', ['search']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['clear']);
    mockErrorService = jasmine.createSpyObj('ErrorService', ['logError']);

    TestBed.configureTestingModule({
      providers: [
        ResultsStore,
        { provide: SearchService, useValue: mockSearchService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: ErrorService, useValue: mockErrorService },
      ],
    });

    store = TestBed.inject(ResultsStore);
  });

  it('should have initial state', () => {
    store.result$.subscribe((result) => expect(result).toEqual([]));
    store.resultCount$.subscribe((count) => expect(count).toBe(0));
    store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeFalse());
  });

  it('should update state correctly when search succeeds', () => {
    const results = [{ workId: 1, matches: [Testdata.match] }];
    // GIVEN
    (mockSearchService.search as jasmine.Spy).and.returnValue(of(results));
    // WHEN
    store.searchParagraphs({
      workIds: [1],
      searchTerms: ['term'],
      scope: SearchScope.Paragraph,
    });
    // THEN
    expect(mockMessageService.clear).toHaveBeenCalled();
    store.result$.subscribe((result) => expect(result).toEqual(results));
    store.resultCount$.subscribe((count) => expect(count).toBe(1));
    store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeTrue());
  });

  it('should log error when search fails', () => {
    // GIVEN
    mockSearchService.search.and.returnValue(
      throwError(() => new Error('Some error'))
    );
    // WHEN
    store.searchParagraphs({
      workIds: [1],
      searchTerms: ['term'],
      scope: SearchScope.Paragraph,
    });
    // THEN
    expect(mockErrorService.logError).toHaveBeenCalledWith('Some error');
    store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeFalse());
  });
});
