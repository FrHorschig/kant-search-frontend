import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { SearchStore } from './search.store';
import { Router } from '@angular/router';
import { Testdata } from 'src/app/common/test/testdata';
import { SearchScope, Work } from 'kant-search-api';
import { Section } from '../../model/simple-input';
import { Store } from '@ngrx/store';
import { WorksReducers } from 'src/app/store/works';
import { TranslateModule } from '@ngx-translate/core';

describe('SearchStore', () => {
  let store: SearchStore;
  let mockStore: jasmine.SpyObj<Store>;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchStore,
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
        provideMockActions(() => actions$),
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    });

    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    store = TestBed.inject(SearchStore);
  });

  it('should navigate when workIds and search terms exist', () => {
    // GIVEN
    store.putWorks([Testdata.work]);
    store.putSimpleInput({ section: Section.CUSTOM, searchString: 'test' });
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectWorksBySection) {
        return of(Testdata.worksBySection);
      }
      return of();
    });
    // WHEN
    store.navigateSearch();
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/de/search/results'], {
      queryParams: {
        workIds: '1',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
  });

  it('should navigate with non-custom section and search terms', () => {
    // GIVEN
    store.putSimpleInput({ section: Section.ALL, searchString: 'test' });
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectWorksBySection) {
        return of(Testdata.worksBySection);
      }
      return of();
    });
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch();
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/de/search/results'], {
      queryParams: {
        workIds: '1,2,3',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
    Testdata.worksBySection.set(Section.SEC3, [Testdata.work3]);
  });

  it('should navigate with empty ALL map item', () => {
    // GIVEN
    store.putSimpleInput({ section: Section.ALL, searchString: 'test' });
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectWorksBySection) {
        return of(
          new Map<number, Work[]>([
            [1, [Testdata.work]],
            [2, [Testdata.work2]],
            [3, [Testdata.work3]],
          ])
        );
      }
      return of();
    });
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    // WHEN
    store.navigateSearch();
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/de/search/results'], {
      queryParams: {
        workIds: '',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
    Testdata.worksBySection.set(Section.SEC3, [Testdata.work3]);
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
    store.putSimpleInput({ section: Section.ALL, searchString: 'test' });
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
      section: Section.ALL,
      searchString: '',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeFalse();
    });
  });
});
