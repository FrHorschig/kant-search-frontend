import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { SearchScope } from 'kant-search-api';
import { SearchStore } from './search.store';
import { Router } from '@angular/router';
import { Testdata } from 'src/app/common/test/testdata';

describe('SearchStore', () => {
  let store: SearchStore;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SearchStore,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(SearchStore);
  });

  it('should navigate when workIds and search terms exist', () => {
    // GIVEN
    store.putWorks([Testdata.work]);
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch({
      searchTerms: 'test',
      excludedTerms: '',
      optionalTerms: '',
      scope: SearchScope.Paragraph,
    });
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/search/results'], {
      queryParams: {
        workIds: '1',
        searchTerms: 'test',
        excludedTerms: '',
        optionalTerms: '',
        scope: 'PARAGRAPH',
      },
    });
  });

  it('should not navigate when search terms are empty', () => {
    // GIVEN
    store.putWorks([Testdata.work]);
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch({
      searchTerms: '',
      excludedTerms: '',
      optionalTerms: '',
      scope: SearchScope.Paragraph,
    });
    // THEN
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should not navigate when workIds are empty', () => {
    // GIVEN
    store.putWorks([Testdata.work]);
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch({
      searchTerms: '',
      excludedTerms: '',
      optionalTerms: '',
      scope: SearchScope.Paragraph,
    });
    // THEN
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should update works', () => {
    // WHEN
    store.putWorks([Testdata.work]);
    // THEN
    store
      .select((state) => state.workIds)
      .subscribe((workIds) => {
        expect(workIds).toEqual([1]);
      });
  });

  it('should return true when there are work ids', () => {
    // WHEN
    store.setState({ workIds: [1, 2] });
    // THEN
    store.hasWorks.subscribe((hasWorks: boolean) => {
      expect(hasWorks).toBeTrue();
    });
  });

  it('should return false when there are no work ids', () => {
    // WHEN
    store.setState({ workIds: [] });
    // THEN
    store.hasWorks.subscribe((hasWorks: boolean) => {
      expect(hasWorks).toBeFalse();
    });
  });
});
