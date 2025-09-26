import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ResultsInputComponent } from './results-input/results-input.component';
import { ResultsCountComponent } from './results-count/results-count.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ParagraphDialogComponent } from './paragraph-dialog/paragraph-dialog.component';
import { ResultsComponent } from './results.component';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { createScrollServiceSpy } from 'src/app/common/test/services';
import { MockVolumesStore } from 'src/app/common/store/volumes.store.spec';
import { ResultsStore } from './results.store';
import { MockResultsStore } from './results.store.spec';
import { ScrollService } from 'src/app/common/service/scroll.service';
import { Subject } from 'rxjs';
import { emptyHit, Hit } from '../model/search-result';
import { Testdata } from 'src/app/common/test/testdata';
import { FullTextInfo } from '../model/full-text-info';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let fragmentSubject: Subject<string>;
  let mockRoute: any;
  let mockVolumesStore: MockVolumesStore;
  let mockResultsStore: MockResultsStore;
  let mockScrollService: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    mockResultsStore = new MockResultsStore();
    fragmentSubject = new Subject<string>();
    mockRoute = {
      snapshot: {
        params: { workCode: 'GMS' },
      },
      fragment: fragmentSubject.asObservable(),
    };
    mockVolumesStore = new MockVolumesStore();
    mockResultsStore = new MockResultsStore();
    mockScrollService = createScrollServiceSpy();

    await TestBed.configureTestingModule({
      imports: [
        ResultsComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: VolumesStore, useValue: mockVolumesStore },
      ],
    })
      .overrideProvider(ResultsStore, { useValue: mockResultsStore })
      .overrideProvider(ScrollService, { useValue: mockScrollService })
      .overrideComponent(ResultsComponent, {
        set: {
          imports: [
            CommonModule,
            TranslateModule,
            NzFlexModule,
            NzSpaceModule,
            NzFloatButtonModule,
            NzIconModule,
            NzToolTipModule,
            ResultsInputComponent,
            ResultsCountComponent,
            ResultListComponent,
            ParagraphDialogComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dada on initialization', () => {
    component.ngOnInit();
    expect(mockResultsStore.search).toHaveBeenCalled();
  });

  it('should emit search terms', () => {
    const input = 'search terms';
    component.onSearchTermsChange(input);
    expect(mockResultsStore.putSearchTerms).toHaveBeenCalledWith(input);
  });

  it('should emit update', () => {
    component.onUpdate();
    expect(mockResultsStore.updateSearch).toHaveBeenCalled();
  });

  it('should navigate to section', () => {
    const input = 'workCode';
    component.onResultNavigation(input);
    expect(mockResultsStore.navigateToSection).toHaveBeenCalledWith(input);
  });

  it('should navigate to page', () => {
    const input = 8;
    component.onPageChange(input);
    expect(mockResultsStore.navigateToPage).toHaveBeenCalledWith(input);
  });

  it('should update hit and dialog switch', () => {
    const input: Hit = {
      snippets: [],
      fmtTextWithHl: 'txt',
      ordinal: 2,
      index: 1,
      work: Testdata.work,
    };
    expect(component.hit).toEqual(emptyHit);
    expect(component.showParagraph).toBeFalse();
    component.onClick(input);
    expect(component.hit).toEqual(input);
    expect(component.showParagraph).toBeTrue();
  });

  it('should navigate to full text', () => {
    const input: FullTextInfo = { workCode: 'code', fragment: 'frag' };
    component.onFullTextNavigation(input);
    expect(mockResultsStore.navigateToFullText).toHaveBeenCalledWith(input);
  });
});
