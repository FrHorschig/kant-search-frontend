import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ErrorMessage,
  HttpError,
  SearchScope,
  SearchService,
} from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { EMPTY, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ErrorService } from 'src/app/common/service/error.service';
import { Testdata } from 'src/app/common/test/testdata';
import { FullTextInfo } from '../../model/full-text-info';
import { ResultsStore } from './results.store';

describe('ResultsStore', () => {
  let store: ResultsStore;
  let router: Router;
  let mockSearchService: jasmine.SpyObj<SearchService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockErrorService: jasmine.SpyObj<ErrorService>;
  let mockActivatedRoute: any = { queryParamMap: EMPTY };

  const testScheduler = new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected),
  );
  beforeEach(() => {
    mockSearchService = jasmine.createSpyObj('SearchService', ['search']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['clear']);
    mockErrorService = jasmine.createSpyObj('ErrorService', ['logError']);
    mockActivatedRoute = {
      queryParamMap: testScheduler.createColdObservable('a', {
        a: convertToParamMap({
          workIds: '1,2',
          searchString: 'term',
          scope: SearchScope.Paragraph,
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        ResultsStore,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MessageService, useValue: mockMessageService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: SearchService, useValue: mockSearchService },
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    });

    store = TestBed.inject(ResultsStore);
    router = TestBed.inject(Router);
  });

  it('should have initial state', () => {
    store.searchString$.subscribe((str) => expect(str).toEqual(''));
    store.results$.subscribe((result) => expect(result).toEqual([]));
    store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeFalse());
  });

  it('should update state correctly when search succeeds', () => {
    testScheduler.run(({ flush }) => {
      const results = [{ workId: 1, matches: [Testdata.match] }];
      // GIVEN
      (mockSearchService.search as jasmine.Spy).and.returnValue(of(results));
      // WHEN
      store.searchParagraphs();
      flush();
      // THEN
      expect(mockMessageService.clear).toHaveBeenCalled();
      expect(mockSearchService.search).toHaveBeenCalled();
      store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeTrue());
      store.results$.subscribe((res) => expect(res).toEqual(results));
    });
  });

  it('should log error when search fails', () => {
    testScheduler.run(({ flush }) => {
      const err: HttpError = {
        code: 400,
        message: ErrorMessage.BadRequestGeneric,
        params: ['param'],
      };
      // GIVEN
      (mockSearchService.search as jasmine.Spy).and.returnValue(
        throwError(() => new HttpErrorResponse({ error: err })),
      );
      // WHEN
      store.searchParagraphs();
      flush();
      // THEN
      expect(mockErrorService.logError).toHaveBeenCalledWith(err);
      store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBeTrue());
    });
  });

  /* TODO frhorschig
  it('should navigate when updateSearch is called', () => {
    testScheduler.run(({ flush }) => {
      const results = [{ workId: 1, matches: [Testdata.match] }];
      // GIVEN
      spyOn(router, 'navigate');
      store.patchState({ searchString: '' });
      (mockSearchService.search as jasmine.Spy).and.returnValue(of(results));
      // WHEN
      store.updateSearch('test');
      flush();
      // THEN
      expect(mockMessageService.clear).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/de/search/results'], {
        queryParams: {
          workIds: '1,2',
          searchString: 'test',
          scope: SearchScope.Paragraph,
        },
      });
    });
  });
  */

  it('should navigate when navigateToFullText is called', () => {
    const info: FullTextInfo = {
      workId: 1,
      fragment: 'fragment',
    };
    // GIVEN
    const routerSpy = spyOn(router, 'navigate');
    // WHEN
    store.navigateToFullText(info);
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/de/read/text', info.workId], {
      fragment: info.fragment,
    });
  });
});
