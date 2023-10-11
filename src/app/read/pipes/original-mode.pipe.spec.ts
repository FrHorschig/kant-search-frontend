import { OriginalModePipe } from './original-mode.pipe';

const s3 = '&nbsp;&nbsp;&nbsp;';

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
      `</br></br><span class="ks-pagination-m">[1]</span>`
    );
  });

  it('should replace {p#} pattern correctly with <span class="ks-h">', () => {
    const input = '{p1}<span class="ks-h"> This is a test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      `</br><span class="ks-pagination-m">[1]</span><span class="ks-h">`
    );
  });

  it('should add leading zero for {l#} pattern', () => {
    const input = '{l5} This is another test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      `</br>${s3}<span class="ks-pagination-s">05</span>${s3}`
    );
  });

  it('should replace number with dot for {l#} pattern', () => {
    const input = '{l2} This is another test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      `</br>${s3}<span class="ks-pagination-s">${s3}.</span>${s3}`
    );
  });

  it('should handle two digit numbers for {l#} pattern', () => {
    const input = '{l10} Yet another test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      `</br>${s3}<span class="ks-pagination-s">10</span>${s3}`
    );
  });

  it('should handle both patterns in the same input', () => {
    const input = '{p5} This is {l15} a mixed test string.';
    const output = pipe.transform(input);
    expect(output).toContain(
      `</br></br><span class="ks-pagination-m">[5]</span>`
    );
    expect(output).toContain(
      `</br>${s3}<span class="ks-pagination-s">15</span>${s3}`
    );
  });
});
