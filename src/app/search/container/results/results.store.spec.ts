import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ResultsStore } from './results.store';
import {
  ErrorMessage,
  HttpError,
  SearchScope,
  SearchService,
} from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/common/service/error.service';
import { Testdata } from 'src/app/common/test/testdata';
import { HttpErrorResponse } from '@angular/common/http';

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
    store.results$.subscribe((result) => expect(result).toEqual([]));
    store.isLoading$.subscribe((isLoaded) => expect(isLoaded).toBeFalse());
  });

  it('should update state correctly when search succeeds', () => {
    const results = [{ workId: 1, matches: [Testdata.match] }];
    // GIVEN
    (mockSearchService.search as jasmine.Spy).and.returnValue(of(results));
    // WHEN
    store.searchParagraphs({
      workIds: [1],
      searchString: 'term',
      options: {
        scope: SearchScope.Paragraph,
      },
    });
    // THEN
    expect(mockMessageService.clear).toHaveBeenCalled();
    store.results$.subscribe((result) => expect(result).toEqual(results));
    store.isLoading$.subscribe((isLoading) => expect(isLoading).toBeFalse());
  });

  it('should log error when search fails', () => {
    // GIVEN
    mockSearchService.search.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            error: {
              code: 404,
              message: ErrorMessage.NotFoundMatches,
              args: ['arg'],
            } as HttpError,
          })
      )
    );
    // WHEN
    store.searchParagraphs({
      workIds: [1],
      searchString: 'term',
      options: {
        scope: SearchScope.Paragraph,
      },
    });
    // THEN
    expect(mockErrorService.logError).toHaveBeenCalledWith(
      ErrorMessage.NotFoundMatches,
      ['arg']
    );
    store.isLoading$.subscribe((isLoading) => expect(isLoading).toBeFalse());
  });
});
