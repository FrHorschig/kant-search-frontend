import { NormalModePipe } from './normal-mode.pipe';
import { TestBed } from '@angular/core/testing';

describe('NormalModePipe', () => {
  let pipe: NormalModePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalModePipe],
    });
    pipe = new NormalModePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace {p#} with the appropriate span', () => {
    const result = pipe.transform('This is a test {p123} string');
    expect(result).toBe(
      'This is a test <span class="ks-pagenr-normal">[123]</span> string'
    );
  });

  it('should replace {p#} followed by <span class="ks-h"> with a break and appropriate spans', () => {
    const result = pipe.transform(
      'Another test {p456} <span class="ks-h"> example'
    );
    expect(result).toBe(
      'Another test <span class="ks-pagenr-normal">[456]</span> </br><span class="ks-h"> example'
    );
  });

  it('should handle multiple replacements with line break', () => {
    const result = pipe.transform(
      'Multiple {p789} instances {p101} <span class="ks-h"> in a sentence'
    );
    expect(result).toBe(
      'Multiple <span class="ks-pagenr-normal">[789]</span> instances <span class="ks-pagenr-normal">[101]</span> </br><span class="ks-h"> in a sentence'
    );
  });

  it('should handle multiple replacements without line break', () => {
    const result = pipe.transform(
      'Multiple {p789} instances {p101} in a <span class="ks-h"> sentence'
    );
    expect(result).toBe(
      'Multiple <span class="ks-pagenr-normal">[789]</span> instances <span class="ks-pagenr-normal">[101]</span> in a <span class="ks-h"> sentence'
    );
  });

  it('should return the original string if there are no matches', () => {
    const result = pipe.transform('A simple string without patterns.');
    expect(result).toBe('A simple string without patterns.');
  });
});
