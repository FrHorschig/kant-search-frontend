import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { Testdata } from 'src/app/common/test/testdata';
import { ParagraphDialogComponent } from '../../presentational/paragraph-dialog/paragraph-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from 'src/app/common/common.module';
import { ResultsStore } from './results.store';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FullTextInfo } from '../../model/full-text-info';
import { createScrollServiceSpy } from 'src/app/common/test/serivces';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let fragmentSubject = new Subject<string>();
  let mockActivatedRoute = {
    fragment: fragmentSubject.asObservable(),
  };
  let mockScrollService = createScrollServiceSpy();
  let mockResultsStore = jasmine.createSpyObj(
    'ResultsStore',
    ['searchParagraphs', 'updateSearch', 'navigateToFullText'],
    {
      result$: of([]),
      resultCount$: of(0),
      isLoaded$: of(true),
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent, ParagraphDialogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideMockStore({}),
      ],
      imports: [
        TranslateModule.forRoot(),
        DialogModule,
        CommonModule,
        ButtonModule,
        TooltipModule,
      ],
    })
      .overrideProvider(ResultsStore, { useValue: mockResultsStore })
      .overrideProvider(ScrollService, { useValue: mockScrollService });

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockResultsStore.searchParagraphs.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchParagraphs on ngOnInit', () => {
    // WHEN
    component.ngOnInit();
    // THEN
    expect(mockResultsStore.searchParagraphs).toHaveBeenCalled();
  });

  it('should not call scroll service when no fragment exists', () => {
    mockScrollService.scrollToAnchor.calls.reset();
    // WHEN
    component.ngAfterViewInit();
    fragmentSubject.next('');
    // THEN
    expect(mockScrollService.scrollToAnchor).not.toHaveBeenCalled();
  });

  it('should call scroll service when a fragment exists', () => {
    mockScrollService.scrollToAnchor.calls.reset();
    const fragment = 'id-1';
    // WHEN
    component.ngAfterViewInit();
    fragmentSubject.next(fragment);
    // THEN
    expect(mockScrollService.scrollToAnchor).toHaveBeenCalledWith(fragment);
  });
  it('should set text and pages on match click', () => {
    // WHEN
    component.onClick(Testdata.matchInfo);
    // THEN
    expect(component.matchInfo).toBe(Testdata.matchInfo);
    expect(component.showParagraph).toBeTrue();
  });

  it('should update search string and trigger a new search', () => {
    const testSearchString = 'Test String';
    // WHEN
    component.onUpdate(testSearchString);
    // GIVEN
    expect(mockResultsStore.updateSearch).toHaveBeenCalledWith(
      testSearchString
    );
  });

  it('should call navigateToFullText', () => {
    const info: FullTextInfo = {
      workId: 1,
      fragment: 'fragment',
    };
    // WHEN
    component.onFullTextNavigation(info);
    // THEN
    expect(mockResultsStore.navigateToFullText).toHaveBeenCalledWith(info);
  });
});
