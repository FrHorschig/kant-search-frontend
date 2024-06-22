import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { SearchScope, Work } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Testdata } from 'src/app/common/test/testdata';
import { LanguageStore } from 'src/app/store/language/language.store';
import { WorksStore } from 'src/app/store/works/works.store';
import { SelectionGroup } from '../../model/selection-group';
import { SearchStore } from './search.store';

describe('SearchStore', () => {
  let store: SearchStore;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let worksStore = jasmine.createSpyObj('WorksStore', [], {
    worksBySection$: of(Testdata.worksBySection),
  });
  let langStore = jasmine.createSpyObj('LanguageStore', [''], {
    currentLanguage$: of('de'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchStore,
        { provide: Router, useValue: router },
        { provide: WorksStore, useValue: worksStore },
        { provide: LanguageStore, useValue: langStore },
      ],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
    });

    store = TestBed.inject(SearchStore);
  });

  it('should navigate when workIds and search terms exist', () => {
    // GIVEN
    store.putWorks([Testdata.work]);
    store.putSelectionGroup(SelectionGroup.CUSTOM);
    store.putSearchString('test');
    // WHEN
    store.navigateSearch();
    // THEN
    expect(router.navigate).toHaveBeenCalledWith(['/de/search/results'], {
      queryParams: {
        workIds: '1',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
  });

  it('should navigate with non-custom section and search terms', () => {
    // GIVEN
    store.putSearchString('test');
    // WHEN
    store.navigateSearch();
    // THEN
    expect(router.navigate).toHaveBeenCalledWith(['/de/search/results'], {
      queryParams: {
        workIds: '1-3',
        searchString: 'test',
        scope: 'PARAGRAPH',
      },
    });
    Testdata.worksBySection.set(SelectionGroup.SEC3, [Testdata.work3]);
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

  it('should be unable to search if search string is empty', () => {
    // WHEN
    store.setState({
      workIds: [1, 2],
      selectionGroup: SelectionGroup.ALL,
      searchString: '',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeFalse();
    });
  });

  it('should be unable to search if selection group is CUSTOM and workIds is empty', () => {
    // WHEN
    store.setState({
      workIds: [],
      selectionGroup: SelectionGroup.CUSTOM,
      searchString: 'test',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeFalse();
    });
  });

  it('should be able to search if selection group is ALL', () => {
    // WHEN
    store.setState({
      workIds: [],
      selectionGroup: SelectionGroup.ALL,
      searchString: 'test',
      options: { scope: SearchScope.Paragraph },
    });
    // THEN
    store.canSearch$.subscribe((canSearch: boolean) => {
      expect(canSearch).toBeTrue();
    });
  });
});
