import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReadComponent } from './read.component';
import { ReadStore } from './read.store';
import { Subject, of } from 'rxjs';
import { Testdata } from 'src/app/common/test/testdata';
import { ScrollService } from '../../../common/service/scroll.service';
import { createScrollServiceSpy } from 'src/app/common/test/serivces';

describe('TextComponent', () => {
  let component: ReadComponent;
  let fixture: ComponentFixture<ReadComponent>;
  let mockReadStore: jasmine.SpyObj<ReadStore>;
  let mockRoute: any;
  let mockScrollService = createScrollServiceSpy();
  let fragmentSubject = new Subject<string>();

  beforeEach(() => {
    mockReadStore = jasmine.createSpyObj('ReadStore', ['loadParagraphs'], {
      paragraphs$: of([Testdata.paragraph]),
      isLoaded$: of(true),
    });
    mockRoute = {
      snapshot: {
        params: { workId: 1 },
      },
      fragment: fragmentSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      declarations: [ReadComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
    })
      .overrideProvider(ReadStore, { useValue: mockReadStore })
      .overrideProvider(ScrollService, { useValue: mockScrollService });

    fixture = TestBed.createComponent(ReadComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load paragraphs on initialization with correct workId', () => {
    component.ngOnInit();
    expect(mockReadStore.loadParagraphs).toHaveBeenCalledWith(1);
  });

  it('should have correct observables from store', () => {
    // WHEN
    component = new ReadComponent(mockRoute, mockReadStore, mockScrollService);
    // THEN
    component.paragraphs$.subscribe((paras) => {
      expect(paras).toHaveSize(1);
      expect(paras).toContain(Testdata.paragraph);
    });
    component.isLoaded$.subscribe((isLoaded) => {
      expect(isLoaded).toEqual(true);
    });
  });

  it('should call scroll service when no fragment exists', () => {
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
});
