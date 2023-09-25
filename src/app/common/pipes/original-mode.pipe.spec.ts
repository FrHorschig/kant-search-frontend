import { OriginalModePipe } from './original-mode.pipe';

describe('OriginalModePipe', () => {
  let pipe: OriginalModePipe;

  beforeEach(() => {
    pipe = new OriginalModePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace {p#} pattern correctly without <span class="ks-h">', () => {
    const input = '{p1} This is a test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      '</br></br><span class="ks-pagination-m">[1]</span>'
    );
  });

  it('should replace {p#} pattern correctly with <span class="ks-h">', () => {
    const input = '{p1}<span class="ks-h"> This is a test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      '</br><span class="ks-pagination-m">[1]</span><span class="ks-h">'
    );
  });

  it('should replace {l#} pattern correctly', () => {
    const input = '{l1} This is another test string.';
    const output = pipe.transform(input);
    const space = '&nbsp;&nbsp;&nbsp;';
    expect(output).toContain(
      `</br>${space}<span class="ks-pagination-s">01</span>${space}`
    );
  });

  it('should handle two digit numbers for {l#} pattern', () => {
    const input = '{l12} Yet another test string.';
    const output = pipe.transform(input);
    const space = '&nbsp;&nbsp;&nbsp;';
    expect(output).toContain(
      `</br>${space}<span class="ks-pagination-s">12</span>${space}`
    );
  });

  it('should handle both patterns in the same input', () => {
    const input = '{p5} This is {l2} a mixed test string.';
    const output = pipe.transform(input);
    const space = '&nbsp;&nbsp;&nbsp;';
    expect(output).toContain(
      '</br></br><span class="ks-pagination-m">[5]</span>'
    );
    expect(output).toContain(
      `</br>${space}<span class="ks-pagination-s">02</span>${space}`
    );
  });
});
