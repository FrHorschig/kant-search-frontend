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
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ResultsStore', () => {
  let store: ResultsStore;
  let mockSearchService: jasmine.SpyObj<SearchService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockErrorService: jasmine.SpyObj<ErrorService>;
  let router: Router;

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
      imports: [RouterTestingModule],
    });

    store = TestBed.inject(ResultsStore);
    router = TestBed.inject(Router);
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
    const err: HttpError = {
      code: 404,
      message: ErrorMessage.NotFoundMatches,
      params: ['param'],
    };
    // GIVEN
    mockSearchService.search.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: err }))
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
    expect(mockErrorService.logError).toHaveBeenCalledWith(err);
    store.isLoading$.subscribe((isLoading) => expect(isLoading).toBeFalse());
  });

  it('should update search string', () => {
    // WHEN
    store.updateSearchString('test');
    // THEN
    store.searchString$.subscribe((searchString) =>
      expect(searchString).toBe('test')
    );
  });

  it('should navigate when updateSearch is called', () => {
    // GIVEN
    const routerSpy = spyOn(router, 'navigate');
    // WHEN
    store.updateSearch();
    // THEN
    expect(mockMessageService.clear).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});
