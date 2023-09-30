import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { SearchStore } from './search.store';
import { Router } from '@angular/router';
import { Testdata } from 'src/app/common/test/testdata';
import { SearchScope } from 'kant-search-api';

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
    store.putSearchString('test');
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch();
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/search/results'], {
      queryParams: {
        workIds: '1',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
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

  it('should update search string', () => {
    // WHEN
    store.putSearchString('test');
    // THEN
    store
      .select((state) => state.searchString)
      .subscribe((searchString) => {
        expect(searchString).toEqual('test');
      });
  });

  it('should update options', () => {
    // WHEN
    store.putOptions({ scope: SearchScope.Sentence });
    // THEN
    store
      .select((state) => state.options)
      .subscribe((options) => {
        expect(options.scope).toEqual(SearchScope.Sentence);
      });
  });

  it('should return false when there is not search string', () => {
    // WHEN
    store.setState({
      workIds: [1, 2],
      searchString: '',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeFalse();
    });
  });

  it('should return false when there are no work ids', () => {
    // WHEN
    store.setState({
      workIds: [],
      searchString: 'test',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeFalse();
    });
  });
});
