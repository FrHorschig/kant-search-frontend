import { TestBed } from '@angular/core/testing';
import { SearchStore } from './search.store';
import { Testdata } from 'src/app/common/test/testdata';

describe('SearchStore', () => {
  let store: SearchStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchStore],
    });

    store = TestBed.inject(SearchStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update search terms', () => {
    // WHEN
    store.putSearchTerms('term1 term2');
    // THEN
    store
      .select((state) => state.searchTerms)
      .subscribe((terms) => {
        expect(terms).toEqual(['term1', 'term2']);
      });
  });

  it('should update workIds', () => {
    // WHEN
    store.putWorks([Testdata.work, Testdata.work2]);
    // THEN
    store
      .select((state) => state.workIds)
      .subscribe((ids) => {
        expect(ids).toEqual([1, 2]);
      });
  });

  it('should allow search when terms and works exist', () => {
    // THEN
    store.putSearchTerms('term1');
    store.putWorks([Testdata.work, Testdata.work2]);
    // THEN
    store.isSearchPermitted$.subscribe((isPermitted) => {
      expect(isPermitted).toBe(true);
    });
  });

  it('should not allow search when no search terms exist', () => {
    // THEN
    store.putWorks([Testdata.work, Testdata.work2]);
    // THEN
    store.isSearchPermitted$.subscribe((isPermitted) => {
      expect(isPermitted).toBe(false);
    });
  });

  it('should not allow search when no work exist', () => {
    // THEN
    store.putSearchTerms('term1');
    // THEN
    store.isSearchPermitted$.subscribe((isPermitted) => {
      expect(isPermitted).toBe(false);
    });
  });
});
