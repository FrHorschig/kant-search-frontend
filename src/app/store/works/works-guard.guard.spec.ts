import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WorksLoadedService } from './works-guard.guard';
import { WorksReducers } from '.';

describe('WorksLoadedService', () => {
  let service: WorksLoadedService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorksLoadedService, provideMockStore()],
    });
    service = TestBed.inject(WorksLoadedService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update isLoaded when store emits value', () => {
    const mockIsLoaded = true;
    store.overrideSelector(WorksReducers.selectIsLoaded, mockIsLoaded);

    store.refreshState();

    expect(service.isLoaded).toBe(mockIsLoaded);
  });

  it('should unsubscribe from the store on destroy', () => {
    spyOn(service['subscription'], 'unsubscribe');

    service.ngOnDestroy();

    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    service.ngOnDestroy(); // Clean up any subscriptions
  });
});
