import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let mockRenderer2: jasmine.SpyObj<Renderer2>;
  let mockRendererFactory2: jasmine.SpyObj<RendererFactory2>;

  beforeEach(() => {
    mockRenderer2 = jasmine.createSpyObj('Renderer2', ['selectRootElement']);
    mockRendererFactory2 = jasmine.createSpyObj('RendererFactory2', [
      'createRenderer',
    ]);

    mockRendererFactory2.createRenderer.and.returnValue(mockRenderer2);

    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: RendererFactory2, useValue: mockRendererFactory2 },
      ],
    });

    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call scrollIntoView if targetElement exists', (done) => {
    // GIVEN
    const spyMethod = jasmine.createSpy();
    spyOn(document, 'getElementById').and.returnValue({
      scrollIntoView: spyMethod,
    } as any);
    mockRenderer2.selectRootElement.and.returnValue({
      scrollIntoView: spyMethod,
    } as any);
    // WHEN
    service.scrollToAnchor('test-anchor');
    // THEN
    setTimeout(() => {
      expect(mockRenderer2.selectRootElement).toHaveBeenCalled();
      expect(spyMethod).toHaveBeenCalled();
      done();
    }, 150);
  });

  it('should not call scrollIntoView if targetElement does not exist', (done) => {
    // GIVEN
    spyOn(document, 'getElementById').and.returnValue(null);
    // WHEN
    service.scrollToAnchor('non-existent-anchor');
    // THEN
    setTimeout(() => {
      expect(mockRenderer2.selectRootElement).not.toHaveBeenCalled();
      done();
    }, 150);
  });
});
