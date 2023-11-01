import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { WorksEffects } from './works.effects';
import { loadWorks, loadWorksSuccess } from './works.actions';
import {
  ErrorMessage,
  HttpError,
  ReadService,
} from '@frhorschig/kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';
import {
  createErrorServiceSpy,
  createReadServiceSpy,
} from 'src/app/common/test/api-services';
import { Testdata } from 'src/app/common/test/testdata';
import { HttpErrorResponse } from '@angular/common/http';

describe('WorksEffects', () => {
  let sut: WorksEffects;
  let actions$: Observable<any>;
  let readService: jasmine.SpyObj<ReadService>;
  let errorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorksEffects,
        provideMockActions(() => actions$),
        { provide: ReadService, useValue: createReadServiceSpy() },
        { provide: ErrorService, useValue: createErrorServiceSpy() },
      ],
    });

    sut = TestBed.inject(WorksEffects);
    readService = TestBed.inject(ReadService) as jasmine.SpyObj<ReadService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  });

  it('should load works data and dispatch loadWorksSuccess action', () => {
    // GIVEN
    (readService.getVolumes as jasmine.Spy).and.returnValue(
      of([Testdata.volume])
    );
    (readService.getWorks as jasmine.Spy).and.returnValue(of([Testdata.work]));
    // WHEN
    actions$ = hot('-a-', { a: loadWorks() });
    // THEN
    const expected = cold('-b-', {
      b: loadWorksSuccess({
        volumes: [Testdata.volume],
        works: [Testdata.work],
      }),
    });
    expect(sut.loadData$).toBeObservable(expected);
  });

  it('should handle errors', () => {
    // GIVEN
    readService.getVolumes.and.returnValue(
      throwError(() => new Error('error'))
    );
    readService.getVolumes.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            error: {
              code: 404,
              message: ErrorMessage.NotFoundVolumes,
            } as HttpError,
          })
      )
    );
    readService.getWorks.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            error: {
              code: 404,
              message: ErrorMessage.NotFoundWorks,
            } as HttpError,
          })
      )
    );
    // WHEN
    actions$ = cold('-a-', { a: loadWorks() });
    // THEN
    sut.loadData$.subscribe(() => {
      expect(errorService.logError).toHaveBeenCalled();
    });
  });
});
