import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { WorksEffects } from './works.effects';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { ReadService, Volume, Work } from 'kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';
import {
  createErrorServiceSpy,
  createReadServiceSpy,
} from 'src/app/common/test/api-services';

describe('WorksEffects', () => {
  let effects: WorksEffects;
  let actions$: Observable<any>;
  let readService: jasmine.SpyObj<ReadService>;
  let errorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    const readServiceSpy = createReadServiceSpy();
    const errorServiceSpy = createErrorServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        WorksEffects,
        provideMockActions(() => actions$),
        { provide: ReadService, useValue: readServiceSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
      ],
    });

    effects = TestBed.inject(WorksEffects);
    readService = TestBed.inject(ReadService) as jasmine.SpyObj<ReadService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  });

  it('should load works data and dispatch loadWorksSuccess action', () => {
    const volumes: Volume[] = [{ id: 1, title: 'Volume 1', section: 1 }];
    const works: Work[] = [{ id: 1, title: 'Work 1', ordinal: 0, volumeId: 1 }];

    // GIVEN
    (readService.getVolumes as jasmine.Spy).and.returnValue(of(volumes));
    (readService.getWorks as jasmine.Spy).and.returnValue(of(works));

    // WHEN
    actions$ = hot('-a-', { a: loadWorks() });

    // THEN
    const expected = cold('-b-', {
      b: loadWorksSuccess({ volumes, works }),
    });
    expect(effects.loadData$).toBeObservable(expected);
  });

  it('should handle errors', () => {
    // GIVEN
    readService.getVolumes.and.returnValue(
      throwError(() => new Error('error'))
    );
    readService.getWorks.and.returnValue(throwError(() => new Error('error')));

    // WHEN
    actions$ = cold('-a-', { a: loadWorks() });

    // THEN
    effects.loadData$.subscribe(() => {
      expect(errorService.logError).toHaveBeenCalled();
    });
  });
});
