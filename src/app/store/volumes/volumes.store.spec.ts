// import { HttpErrorResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { ReadService, Volume } from '@frhorschig/kant-search-api';
// import { of, throwError } from 'rxjs';
// import { ErrorService } from 'src/app/common/service/error.service';
// import { Testdata } from 'src/app/common/test/testdata';
// import { VolumesStore } from './volumes.store';

// describe('WorksStore', () => {
//   let store: VolumesStore;
//   let errorService: jasmine.SpyObj<ErrorService>;
//   let readService: jasmine.SpyObj<ReadService>;

//   beforeEach(() => {
//     errorService = jasmine.createSpyObj('ErrorService', [
//       'logError',
//       'logErrorString',
//     ]);
//     readService = jasmine.createSpyObj('ReadService', [
//       'getVolumes',
//       'getWorks',
//       'getParagraphs',
//     ]);
//     TestBed.configureTestingModule({
//       providers: [
//         VolumesStore,
//         { provide: ReadService, useValue: readService },
//         { provide: ErrorService, useValue: errorService },
//       ],
//     });

//     store = TestBed.inject(VolumesStore);
//   });

//   it('should have initial state', () => {
//     store.volumes$.subscribe((volumes) => expect(volumes).toEqual([]));
//     store.workByCode$.subscribe((workById) => expect(workById.size).toBe(0));
//     store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBe(false));
//   });

//   it('should load data and update state', (done) => {
//     const volumes: Volume[] = [
//       {
//         volumeNumber: 2,
//         section: 1,
//         works: [Testdata.workRef2, Testdata.workRef3],
//       } as Volume,
//       { volumeNumber: 1, section: 1, works: [Testdata.workRef] } as Volume,
//     ];

//     (readService.getVolumes as jasmine.Spy).and.returnValue(of(volumes));

//     store.loadData();
//     store.state$.subscribe((state) => {
//       expect(state.volumes[0]).toEqual(volumes[1]);
//       expect(state.volumes[1]).toEqual(volumes[0]);
//       expect(state.isLoaded).toBe(true);
//       expect(state.workByCode.get('wId')).toEqual(Testdata.workRef);
//       done();
//     });
//   });

//   it('should handle error object during data loading', (done) => {
//     (readService.getVolumes as jasmine.Spy).and.returnValue(
//       throwError(
//         () =>
//           new HttpErrorResponse({
//             error: { message: 'Test Error' },
//             status: 500,
//           })
//       )
//     );

//     store.loadData();
//     store.state$.subscribe((state) => {
//       expect(state.isLoaded).toBe(false);
//       expect(errorService.logError).toHaveBeenCalled();
//       done();
//     });
//   });

//   it('should handle error string during data loading', (done) => {
//     (readService.getVolumes as jasmine.Spy).and.returnValue(
//       throwError(
//         () => new HttpErrorResponse({ error: 'Test Error', status: 500 })
//       )
//     );

//     store.loadData();
//     store.state$.subscribe((state) => {
//       expect(state.isLoaded).toBe(false);
//       expect(errorService.logErrorString).toHaveBeenCalled();
//       done();
//     });
//   });
// });
