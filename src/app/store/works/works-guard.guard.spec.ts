import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WorksLoadedService } from './works-guard.guard';
import { WorksReducers } from '.';

describe('WorksLoadedService', () => {
  let sut: WorksLoadedService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorksLoadedService, provideMockStore()],
    });
    sut = TestBed.inject(WorksLoadedService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should update isLoaded when store emits value', () => {
    // GIVEN
    store.overrideSelector(WorksReducers.selectIsLoaded, true);
    store.refreshState();
    // WHEN
    const result = sut.isLoaded;
    // THEN
    expect(result).toBe(true);
  });

  it('should unsubscribe from the store on destroy', () => {
    // GIVEN
    spyOn(sut['subscription'], 'unsubscribe');
    // WHEN
    sut.ngOnDestroy();
    // THEN
    expect(sut['subscription'].unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    sut.ngOnDestroy(); // Clean up any subscriptions
  });
});
