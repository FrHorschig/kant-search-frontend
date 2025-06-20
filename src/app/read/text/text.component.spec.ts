import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TextComponent } from './text.component';
import { TextStore } from './text.store';
import { Subject, of } from 'rxjs';
import { ScrollService } from '../../common/service/scroll.service';
import { createScrollServiceSpy } from 'src/app/common/test/services';
import { MockTextStore } from './text.store.spec';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let fragmentSubject: Subject<string>;
  let mockRoute: any;
  let mockTextStore: MockTextStore;
  let mockScrollService: jasmine.SpyObj<ScrollService>;

  beforeEach(() => {
    fragmentSubject = new Subject<string>();
    mockRoute = {
      snapshot: {
        params: { workCode: 'GMS' },
      },
      fragment: fragmentSubject.asObservable(),
    };
    mockTextStore = new MockTextStore();
    mockScrollService = createScrollServiceSpy();

    TestBed.configureTestingModule({
      imports: [TextComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
    })
      .overrideProvider(TextStore, { useValue: mockTextStore })
      .overrideProvider(ScrollService, { useValue: mockScrollService });

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dada on initialization', () => {
    component.ngOnInit();
    expect(mockTextStore.loadData).toHaveBeenCalledWith(
      mockRoute.snapshot.params.workCode
    );
  });

  it('should navigate in onSectionNavigation', () => {
    component.onSectionNavigation(12);
    expect(mockTextStore.navigateToSection).toHaveBeenCalledWith(12);
  });
});
