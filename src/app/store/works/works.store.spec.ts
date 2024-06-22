import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReadService, Volume, Work } from '@frhorschig/kant-search-api';
import { of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/common/service/error.service';
import { Testdata } from 'src/app/common/test/testdata';
import { SelectionGroup } from 'src/app/search/model/selection-group';
import { WorksStore } from './works.store';

describe('WorksStore', () => {
  let store: WorksStore;
  let errorService: jasmine.SpyObj<ErrorService>;
  let readService: jasmine.SpyObj<ReadService>;

  beforeEach(() => {
    errorService = jasmine.createSpyObj('ErrorService', [
      'logError',
      'logErrorString',
    ]);
    readService = jasmine.createSpyObj('ReadService', [
      'getVolumes',
      'getWorks',
      'getParagraphs',
    ]);
    TestBed.configureTestingModule({
      providers: [
        WorksStore,
        { provide: ReadService, useValue: readService },
        { provide: ErrorService, useValue: errorService },
      ],
    });

    store = TestBed.inject(WorksStore);
  });

  it('should have initial state', () => {
    store.volumes$.subscribe((volumes) => expect(volumes).toEqual([]));
    store.volumeById$.subscribe((volumeById) =>
      expect(volumeById.size).toBe(0),
    );
    store.works$.subscribe((works) => expect(works).toEqual([]));
    store.workById$.subscribe((workById) => expect(workById.size).toBe(0));
    store.worksBySection$.subscribe((worksBySection) =>
      expect(worksBySection.size).toBe(0),
    );
    store.isLoaded$.subscribe((isLoaded) => expect(isLoaded).toBe(false));
  });

  it('should load data and update state', (done) => {
    const volumes: Volume[] = [{ id: 1, section: 1 } as Volume];
    const works: Work[] = [{ id: 1, volumeId: 1 } as Work];

    (readService.getVolumes as jasmine.Spy).and.returnValue(of(volumes));
    (readService.getWorks as jasmine.Spy).and.returnValue(of(works));

    store.loadData();
    store.state$.subscribe((state) => {
      expect(state.volumes).toEqual(volumes);
      expect(state.works).toEqual(works);
      expect(state.isLoaded).toBe(true);
      expect(state.volumeById.get(1)).toEqual(volumes[0]);
      expect(state.workById.get(1)).toEqual(works[0]);
      done();
    });
  });

  it('should handle error object during data loading', (done) => {
    (readService.getVolumes as jasmine.Spy).and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'Test Error' },
            status: 500,
          }),
      ),
    );
    (readService.getWorks as jasmine.Spy).and.returnValue(of([]));

    store.loadData();
    store.state$.subscribe((state) => {
      expect(state.isLoaded).toBe(false);
      expect(errorService.logError).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error string during data loading', (done) => {
    (readService.getVolumes as jasmine.Spy).and.returnValue(
      throwError(
        () => new HttpErrorResponse({ error: 'Test Error', status: 500 }),
      ),
    );
    (readService.getWorks as jasmine.Spy).and.returnValue(of([]));

    store.loadData();
    store.state$.subscribe((state) => {
      expect(state.isLoaded).toBe(false);
      expect(errorService.logErrorString).toHaveBeenCalled();
      done();
    });
  });

  it('should categorize works by section', () => {
    const works: Work[] = [Testdata.work, Testdata.work2, Testdata.work3];
    const volumesById = Testdata.volumeById;

    const worksBySection = store['getWorksBySection'](works, volumesById);
    expect(worksBySection.get(SelectionGroup.ALL)?.length).toBe(3);
    expect(worksBySection.get(SelectionGroup.SEC1)?.length).toBe(1);
    expect(worksBySection.get(SelectionGroup.SEC2)?.length).toBe(1);
    expect(worksBySection.get(SelectionGroup.SEC3)?.length).toBe(1);
  });
});
