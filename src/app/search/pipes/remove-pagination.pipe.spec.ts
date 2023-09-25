import { RemovePaginationPipe } from './remove-pagination.pipe';
import { TestBed } from '@angular/core/testing';

describe('NormalModePipe', () => {
  let pipe: RemovePaginationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovePaginationPipe],
    });
    pipe = new RemovePaginationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove {p#}s', () => {
    const result = pipe.transform(
      'Multiple {p789} instances {p101} in a sentence'
    );
    expect(result).toBe('Multiple instances in a sentence');
  });

  it('should remove {l#}s', () => {
    const result = pipe.transform(
      'Multiple {l789} instances {l101} in a sentence'
    );
    expect(result).toBe('Multiple instances in a sentence');
  });

  it('should remove footnote elements', () => {
    const result = pipe.transform(
      'Multiple {fr420.2} instances {fr482.5} in a sentence'
    );
    expect(result).toBe('Multiple instances in a sentence');
  });

  it('should remove multiple different pagination elements', () => {
    const result = pipe.transform(
      'Multiple {p789} instances in {l789} a {fr482.5} sentence'
    );
    expect(result).toBe('Multiple instances in a sentence');
  });
});
