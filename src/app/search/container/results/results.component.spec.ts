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
import { ScrollService } from 'src/app/read/service/scroll.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MatchInfo } from '../../model/match-info';

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
        {
          provide: ScrollService,
          useValue: jasmine.createSpyObj('ScrollService', ['scroll']),
        },
      ],
      imports: [
        TranslateModule.forRoot(),
        DialogModule,
        CommonModule,
        ButtonModule,
        TooltipModule,
      ],
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
    (mockActivatedRoute.queryParamMap as any) = of(
      convertToParamMap({
        workIds: '1,2',
        searchString: 'term1 term2',
        scope: 'SENTENCE',
      })
    );
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      workIds: [1, 2],
      searchString: 'term1 term2',
      options: {
        scope: SearchScope.Sentence,
      },
    });
  });

  it('should call searchParagraphs with paragraph scope on ngOnInit', () => {
    // GIVEN
    (mockActivatedRoute.queryParamMap as any) = of(
      convertToParamMap({
        scope: 'PARAGRAPH',
      })
    );
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      workIds: [],
      searchString: '',
      options: {
        scope: SearchScope.Paragraph,
      },
    });
  });

  it('should call searchParagraphs with default scope on ngOnInit', () => {
    // GIVEN
    (mockActivatedRoute.queryParamMap as any) = of(
      convertToParamMap({
        workIds: '1,2',
        searchString: 'term1 term2',
      })
    );
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalledWith({
      workIds: [1, 2],
      searchString: 'term1 term2',
      options: {
        scope: SearchScope.Paragraph,
      },
    });
  });

  it('should set text and pages on match click', () => {
    // WHEN
    component.onClick(Testdata.matchInfo);
    // THEN
    expect(component.matchInfo).toBe(Testdata.matchInfo);
    expect(component.showParagraph).toBeTrue();
  });
});
