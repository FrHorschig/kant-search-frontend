// import { TestBed } from '@angular/core/testing';
// import { TextStore } from './text.store';
// import { ReadService } from '@frhorschig/kant-search-api';
// import { ErrorService } from 'src/app/common/service/error.service';
// import { createErrorServiceSpy } from 'src/app/common/test/services';
// import { createReadServiceSpy } from 'src/app/common/test/api-services';
// import { MockVolumesStore } from 'src/app/store/volumes/volumes.store.spec';
// import { MockLanguageStore } from 'src/app/store/language/language.store.spec';
// import { VolumesStore } from 'src/app/store/volumes/volumes.store';
// import { LanguageStore } from 'src/app/store/language/language.store';

// describe('TextStore', () => {
//   let store: TextStore;
//   let readService: jasmine.SpyObj<ReadService>;
//   let errorService: jasmine.SpyObj<ErrorService>;
//   let mockVolumesStore: MockVolumesStore;
//   let mockLanguageStore: MockLanguageStore;

//   beforeEach(() => {
//     readService = createReadServiceSpy();
//     errorService = createErrorServiceSpy();
//     mockVolumesStore = new MockVolumesStore();
//     mockLanguageStore = new MockLanguageStore();

//     TestBed.configureTestingModule({
//       providers: [
//         TextStore,
//         { provide: ReadService, useValue: readService },
//         { provide: ErrorService, useValue: errorService },
//         { provide: VolumesStore, useValue: mockVolumesStore },
//         { provide: LanguageStore, useValue: mockLanguageStore },
//       ],
//     });

//     store = TestBed.inject(TextStore);
//   });

//   it('should load data and update state on success', () => {
//     const headings: Heading[] = [
//       { ordinal: 1, text: 'text', tocText: 'Heading 1', pages: [], fnRefs: [] },
//     ];
//     const footnotes: Footnote[] = [
//       { ordinal: 2, ref: 'fn1', text: 'Footnote 1' },
//     ];
//     const paragraphs: Paragraph[] = [
//       { ordinal: 3, text: 'Paragraph 1', fnRefs: ['fn1'], summaryRef: 's1' },
//     ];
//     const summaries = [{ ref: 's1', text: 'Summary 1' }];

//     (readService.getHeadings as jasmine.Spy).and.returnValue(of(headings));
//     (readService.getFootnotes as jasmine.Spy).and.returnValue(of(footnotes));
//     (readService.getParagraphs as jasmine.Spy).and.returnValue(of(paragraphs));
//     (readService.getSummaries as jasmine.Spy).and.returnValue(of(summaries));

//     store.loadData('code');

//     store.textContents$.subscribe((textContents) => {
//       expect(textContents.length).toBe(2);
//       expect(textContents[0].isHeading).toBeTrue();
//       expect(textContents[1].isHeading).toBeFalse();
//     });
//     store.ready$.subscribe((ready) => {
//       expect(ready).toBeTrue();
//     });
//   });

//   it('should handle error and log it', () => {
//     const headings: Heading[] = [
//       { ordinal: 1, text: 'ht', tocText: 'htt', pages: [], fnRefs: [] },
//     ];
//     const footnotes: Footnote[] = [{ ordinal: 2, ref: 'fn1', text: 'ft' }];
//     const err: Error = { name: 'err', message: 'msg' };
//     const summaries = [{ ref: 's1', text: 'st' }];

//     (readService.getHeadings as jasmine.Spy).and.returnValue(of(headings));
//     (readService.getFootnotes as jasmine.Spy).and.returnValue(of(footnotes));
//     readService.getParagraphs.and.returnValue(
//       throwError(() => new HttpErrorResponse({ error: err }))
//     );
//     (readService.getSummaries as jasmine.Spy).and.returnValue(of(summaries));

//     store.loadData('code');

//     expect(errorService.logError).toHaveBeenCalledWith(err);
//   });
// });
