import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { Testdata } from 'src/app/common/test/testdata';
import { ParagraphDialogComponent } from '../../presentational/paragraph-dialog/paragraph-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from 'src/app/common/common.module';
import { ResultsStore } from './results.store';
import { SearchScope } from 'kant-search-api';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mockActivatedRoute = {
    queryParamMap: of(convertToParamMap({})),
  };
  let mockResultsStore = jasmine.createSpyObj(
    'ResultsStore',
    ['searchParagraphs'],
    {
      result$: of([]),
      resultCount$: of(0),
      isLoaded$: of(false),
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent, ParagraphDialogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideMockStore({}),
      ],
      imports: [TranslateModule.forRoot(), DialogModule, CommonModule],
    });
    TestBed.overrideProvider(ResultsStore, { useValue: mockResultsStore });

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockResultsStore.searchParagraphs.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchParagraphs with sentence scope on ngOnInit', () => {
    // GIVEN
    const paramMap = convertToParamMap({
      searchTerms: 'term1,term2',
      workIds: '1,2',
      scope: 'sentence',
    });
    (mockActivatedRoute.queryParamMap as any) = of(paramMap);
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      searchTerms: ['term1', 'term2'],
      workIds: [1, 2],
      scope: SearchScope.Sentence,
    });
  });

  it('should call searchParagraphs with paragraph scope on ngOnInit', () => {
    // GIVEN
    const paramMap = convertToParamMap({
      scope: 'paragraph',
    });
    (mockActivatedRoute.queryParamMap as any) = of(paramMap);
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      searchTerms: [],
      workIds: [],
      scope: SearchScope.Paragraph,
    });
  });

  it('should call searchParagraphs with default scope on ngOnInit', () => {
    // GIVEN
    const paramMap = convertToParamMap({
      searchTerms: 'term1,term2',
      workIds: '1,2',
    });
    (mockActivatedRoute.queryParamMap as any) = of(paramMap);
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      searchTerms: ['term1', 'term2'],
      workIds: [1, 2],
      scope: SearchScope.Paragraph,
    });
  });

  it('should not call searchParagraphs on empty query params', () => {
    // GIVEN
    (mockActivatedRoute.queryParamMap as any) = of(
      convertToParamMap(new Map())
    );
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).not.toHaveBeenCalled();
  });

  it('should set text and pages on match click', () => {
    // WHEN
    component.onClick(Testdata.match);
    // THEN
    expect(component.text).toBe('text');
    expect(component.pages).toEqual([1, 2]);
  });
});
