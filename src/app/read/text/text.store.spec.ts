// import { TestBed } from '@angular/core/testing';
// import { of, throwError } from 'rxjs';
// import { TextStore } from './text.store';
// import {
//   ErrorMessage,
//   Footnote,
//   Heading,
//   HttpError,
//   Paragraph,
//   ReadService,
//   Work,
// } from '@frhorschig/kant-search-api';
// import { ErrorService } from 'src/app/common/service/error.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { createErrorServiceSpy } from 'src/app/common/test/serivces';

// describe('TextStore', () => {
//   let store: TextStore;
//   let readService: jasmine.SpyObj<ReadService>;
//   let errorService: jasmine.SpyObj<ErrorService>;

//   beforeEach(() => {
//     readService = jasmine.createSpyObj('ReadService', [
//       'getWork',
//       'getHeadings',
//       'getFootnotes',
//       'getParagraphs',
//       'getSummaries',
//     ]);
//     errorService = createErrorServiceSpy();

//     TestBed.configureTestingModule({
//       providers: [
//         TextStore,
//         { provide: ReadService, useValue: readService },
//         { provide: ErrorService, useValue: errorService },
//       ],
//     });

//     store = TestBed.inject(TextStore);
//   });

//   // it('should load data and update state on success', () => {
//   //   const mockWork: Work = {
//   //     id: 'work1',
//   //     code: 'code',
//   //     sections: [],
//   //     title: 'title',
//   //   };
//   //   const mockHeadings: Heading[] = [
//   //     { id: 'heading1', text: 'text', tocText: 'Heading 1', fnRefs: [] },
//   //   ];
//   //   const mockFootnotes: Footnote[] = [
//   //     { id: 'footnote1', ref: 'fn1', text: 'Footnote 1' },
//   //   ];
//   //   const mockParagraphs: Paragraph[] = [
//   //     { id: 'p1', text: 'Paragraph 1', fnRefs: ['fn1'], summaryRef: 's1' },
//   //   ];
//   //   const mockSummaries = [{ ref: 's1', text: 'Summary 1' }];

//   //   // GIVEN
//   //   (readService.getWork as jasmine.Spy).and.returnValue(of(mockWork));
//   //   (readService.getHeadings as jasmine.Spy).and.returnValue(of(mockHeadings));
//   //   (readService.getFootnotes as jasmine.Spy).and.returnValue(
//   //     of(mockFootnotes)
//   //   );
//   //   (readService.getParagraphs as jasmine.Spy).and.returnValue(
//   //     of(mockParagraphs)
//   //   );
//   //   (readService.getSummaries as jasmine.Spy).and.returnValue(
//   //     of(mockSummaries)
//   //   );

//   //   // WHEN
//   //   store.loadData('work1');

//   //   // THEN
//   //   store.textContents$.subscribe((textContents) => {
//   //     expect(textContents.length).toBe(2); // One heading + one paragraph
//   //     expect(textContents[0].isHeading).toBeTrue();
//   //     expect(textContents[1].isHeading).toBeFalse();
//   //   });

//   //   store.isLoaded$.subscribe((isLoaded) => {
//   //     expect(isLoaded).toBeTrue();
//   //   });
//   // });

//   // it('should handle error and log it', () => {
//   //   const err: HttpError = {
//   //     code: 404,
//   //     message: ErrorMessage.NotFoundGeneric,
//   //     params: ['param'],
//   //   };

//   //   // GIVEN
//   //   readService.getWork.and.returnValue(
//   //     throwError(() => new HttpErrorResponse({ error: err }))
//   //   );

//   //   // WHEN
//   //   store.loadData('work1');

//   //   // THEN
//   //   expect(errorService.logError).toHaveBeenCalledWith(err);
//   // });
// });
