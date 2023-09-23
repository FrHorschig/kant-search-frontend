import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TextComponent } from './text.component';
import { TextStore } from './text.store';
import { of } from 'rxjs';
import { Testdata } from 'src/app/common/test/testdata';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let mockTextStore: jasmine.SpyObj<TextStore>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockTextStore = jasmine.createSpyObj('TextStore', ['loadParagraphs'], {
      paragraphs$: of([Testdata.paragraph]),
      isLoaded$: of(true),
    });
    mockActivatedRoute = {
      snapshot: {
        params: { workId: 1 },
      },
    };

    TestBed.configureTestingModule({
      declarations: [TextComponent],
      providers: [
        { provide: TextStore, useValue: mockTextStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    TestBed.overrideProvider(TextStore, { useValue: mockTextStore });

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load paragraphs on initialization with correct workId', () => {
    component.ngOnInit();
    expect(mockTextStore.loadParagraphs).toHaveBeenCalledWith(1);
  });

  it('should have correct observables from store', () => {
    // WHEN
    component = new TextComponent(mockActivatedRoute, mockTextStore);
    // THEN
    component.paragraphs$.subscribe((paras) => {
      expect(paras).toHaveSize(1);
      expect(paras).toContain(Testdata.paragraph);
    });
    component.isLoaded$.subscribe((isLoaded) => {
      expect(isLoaded).toEqual(true);
    });
  });
});
