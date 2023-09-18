import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { GlobalDataEffects } from './global-data.effects';
import * as GlobalDataActions from './global-data.actions';
import { ReadService, Volume, Work } from 'kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';

// TODO frhorsch: check tests and add some if necessary
describe('GlobalDataEffects', () => {
  let effects: GlobalDataEffects;
  let actions$: Observable<any>;
  let readService: jasmine.SpyObj<ReadService>;
  let errorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    const readServiceSpy = createReadServiceSpy();
    const errorServiceSpy = createErrorServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        GlobalDataEffects,
        provideMockActions(() => actions$),
        { provide: ReadService, useValue: readServiceSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
      ],
    });

    effects = TestBed.inject(GlobalDataEffects);
    readService = TestBed.inject(ReadService) as jasmine.SpyObj<ReadService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  });

  it('should load global data and dispatch globalDataLoaded action', () => {
    const volumes: Volume[] = [{ id: 0, title: 'Volume 0', section: 1 }];
    const works: Work[] = [{ id: 0, title: 'Work 0', ordinal: 0, volumeId: 0 }];

    // GIVEN
    readService.getVolumes.and.returnValue(of(volumes));
    readService.getWorks.and.returnValue(of(works));

    // WHEN('Unexpected observe valValueErroks)
    actions$ = hot('-a-', { a: GlobalDataActions.loadGlobalData() });

    // THEN
    const expected = cold('-b-', {
      b: GlobalDataActions.globalDataLoaded({ volumes, works }),
    });
    expect(effects.loadData$).toBeObservable(expected);
  });

  it('should handle errors by calling the error service', () => {
    readService.getVolumes.and.returnValue(
      throwError(() => new Error('error'))
    );
    readService.getWorks.and.returnValue(throwError(() => new Error('error')));

    actions$ = hot('-a-', { a: GlobalDataActions.loadGlobalData() });

    effects.loadData$.subscribe(() => {
      expect(errorService.logError).toHaveBeenCalledWith(
        'Error while loading global data'
      );
    });
  });
});
