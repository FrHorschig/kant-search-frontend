// import { HttpErrorResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import {
//   ActivatedRoute,
//   convertToParamMap,
//   Router,
//   RouterModule,
// } from '@angular/router';
// import {
//   ErrorMessage,
//   HttpError,
//   SearchResult,
//   SearchService,
// } from '@frhorschig/kant-search-api';
// import { TranslateModule } from '@ngx-translate/core';
// import { EMPTY, of, throwError } from 'rxjs';
// import { TestScheduler } from 'rxjs/testing';
// import { ErrorService } from 'src/app/common/service/error.service';
// import { Testdata } from 'src/app/common/test/testdata';
// import { LanguageStore } from 'src/app/store/language/language.store';
// import { FullTextInfo } from '../model/full-text-info';
// import { ResultsStore } from './results.store';

// describe('ResultsStore', () => {
//   let store: ResultsStore;
//   let router: jasmine.SpyObj<Router>;
//   let route: any = { queryParamMap: EMPTY };
//   let searchService: jasmine.SpyObj<SearchService>;
//   let errorService: jasmine.SpyObj<ErrorService>;

//   const testScheduler = new TestScheduler((actual, expected) =>
//     expect(actual).toEqual(expected)
//   );
//   beforeEach(() => {
//     router = jasmine.createSpyObj('Router', ['navigate']);
//     route = {
//       queryParamMap: testScheduler.createColdObservable('a', {
//         a: convertToParamMap({
//           workIds: '1,2',
//           searchString: 'term',
//         }),
//       }),
//     };
//     searchService = jasmine.createSpyObj('SearchService', ['search']);
//     errorService = jasmine.createSpyObj('ErrorService', ['logError']);
//     let langStore = jasmine.createSpyObj('LanguageStore', [''], {
//       currentLanguage$: of('de'),
//     });

//     TestBed.configureTestingModule({
//       providers: [
//         ResultsStore,
//         { provide: Router, useValue: router },
//         { provide: ActivatedRoute, useValue: route },
//         { provide: ErrorService, useValue: errorService },
//         { provide: SearchService, useValue: searchService },
//         { provide: LanguageStore, useValue: langStore },
//       ],
//       imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
//     });

//     store = TestBed.inject(ResultsStore);
//   });

//   it('should have initial state', () => {
//     store.searchTer, s$.subscribe((str) => expect(str).toEqual(''));
//     store.results$.subscribe((result) => expect(result).toEqual([]));
//     store.ready$.subscribe((isLoaded) => expect(isLoaded).toBeFalse());
//   });

//   it('should update state correctly when search succeeds', () => {
//     testScheduler.run(({ flush }) => {
//       const results = [{ workId: 'workId', hits: [Testdata.hit] }];
//       // GIVEN
//       (searchService.search as jasmine.Spy).and.returnValue(of(results));
//       // WHEN
//       store.search();
//       flush();
//       // THEN
//       expect(messageService.clear).toHaveBeenCalled();
//       expect(searchService.search).toHaveBeenCalled();
//       store.ready$.subscribe((isLoaded) => expect(isLoaded).toBeTrue());
//       store.results$.subscribe((res) => expect(res).toEqual(results));
//     });
//   });

//   it('should log error when search fails', () => {
//     testScheduler.run(({ flush }) => {
//       const err: HttpError = {
//         code: 400,
//         message: ErrorMessage.BadRequestGeneric,
//         params: ['param'],
//       };
//       // GIVEN
//       (searchService.search as jasmine.Spy).and.returnValue(
//         throwError(() => new HttpErrorResponse({ error: err }))
//       );
//       // WHEN
//       store.search();
//       flush();
//       // THEN
//       expect(errorService.logError).toHaveBeenCalledWith(err);
//       store.ready$.subscribe((isLoaded) => expect(isLoaded).toBeTrue());
//     });
//   });

//   /*
//   it('should navigate when updateSearch is called', () => {
//     testScheduler.run(({ flush }) => {
//       const results = [{ workId: 1, matches: [Testdata.match] }];
//       // GIVEN
//       store.patchState({ searchString: '' });
//       (mockSearchService.search as jasmine.Spy).and.returnValue(of(results));
//       // WHEN
//       store.updateSearch('test');
//       flush();
//       // THEN
//       expect(mockMessageService.clear).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/de/search/results'], {
//         queryParams: {
//           workIds: '1,2',
//           searchString: 'test',
//         },
//       });
//     });
//   });
//   */

//   it('should navigate when navigateToFullText is called', () => {
//     const info: FullTextInfo = {
//       workCode: 1,
//       fragment: 'fragment',
//     };
//     // WHEN
//     store.navigateToFullText(info);
//     // THEN
//     expect(router.navigate).toHaveBeenCalledWith(
//       ['/de/read/text', info.workCode],
//       {
//         fragment: info.fragment,
//       }
//     );
//   });
// });
