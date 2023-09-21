import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextComponent } from './text.component';
import { TextStore } from './text.store';
import { ActivatedRoute } from '@angular/router';

// TODO frhorsch: fix tests
/*
describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let textStore: jasmine.SpyObj<TextStore>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const mockTextStore = {
      loadParagraphs: jasmine.createSpy('loadParagraphs'),
      paragraphs$: jasmine.createSpyObj('Observable', { subscribe: [] }),
      isLoaded$: jasmine.createSpyObj('Observable', { subscribe: true }),
    };
    const mockActivatedRoute = { snapshot: { params: { workId: 1 } } };

    await TestBed.configureTestingModule({
      declarations: [TextComponent],
      providers: [
        { provide: TextStore, useValue: mockTextStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    textStore = TestBed.inject(TextStore) as jasmine.SpyObj<TextStore>;
    activatedRoute = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get workId from route and load paragraphs', () => {
    component.ngOnInit();
    expect(textStore.loadParagraphs).toHaveBeenCalledWith(1);
  });
});
*/
