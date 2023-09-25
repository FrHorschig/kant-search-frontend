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
      'This is a test <span class="ks-pagination-s">[123]</span> string'
    );
  });

  it('should replace {p#} followed by <span class="ks-h"> with a break and appropriate spans', () => {
    const result = pipe.transform(
      'Another test {p456} <span class="ks-h"> example'
    );
    expect(result).toBe(
      'Another test <span class="ks-pagination-s">[456]</span> </br><span class="ks-h"> example'
    );
  });

  it('should handle multiple replacements with line break', () => {
    const result = pipe.transform(
      'Multiple {p789} instances {p101} <span class="ks-h"> in a sentence'
    );
    expect(result).toBe(
      'Multiple <span class="ks-pagination-s">[789]</span> instances <span class="ks-pagination-s">[101]</span> </br><span class="ks-h"> in a sentence'
    );
  });

  it('should handle multiple replacements without line break', () => {
    const result = pipe.transform(
      'Multiple {p789} instances {p101} in a <span class="ks-h"> sentence'
    );
    expect(result).toBe(
      'Multiple <span class="ks-pagination-s">[789]</span> instances <span class="ks-pagination-s">[101]</span> in a <span class="ks-h"> sentence'
    );
  });

  it('should return the original string if there are no matches', () => {
    const result = pipe.transform('A simple string without patterns.');
    expect(result).toBe('A simple string without patterns.');
  });

  it('should remove line numbers', () => {
    const result = pipe.transform(
      'Some text {l2} with line {l5} and {p4} page numbers.'
    );
    expect(result).toBe(
      'Some text with line and <span class="ks-pagination-s">[4]</span> page numbers.'
    );
  });

  it('should return empty string if string is empy', () => {
    expect(pipe.transform('')).toEqual('');
  });
});
