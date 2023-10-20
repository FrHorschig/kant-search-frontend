import { PaginationPipe } from './pagination.pipe';

describe('PaginationPipe', () => {
  let pipe: PaginationPipe = new PaginationPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace {fn#} with the appropriate span', () => {
    const result = pipe.transform('This is a test {fn12.34} string');
    expect(result).toBe(
      'This is a test <sup><span class="ks-fn-ref">(12.34)</span></sup> string'
    );
  });

  it('should remove {l#}', () => {
    const result = pipe.transform('This is a test {l123} string');
    expect(result).toBe('This is a test string');
  });

  it('should replace {p#} with the appropriate span', () => {
    const result = pipe.transform('This is a test {p123} string');
    expect(result).toBe(
      'This is a test <span class="ks-pagination-s">[123]</span> string'
    );
  });

  it('should make all modification in one string'),
    () => {
      const result = pipe.transform(
        'This {fn12.34} is a {l123} test {p123} string'
      );
      expect(result).toBe(
        'This <sup><span class="ks-fn-ref">(12.34)</span></sup> is a test <span class="ks-pagination-s">[123]</span> string'
      );
    };
});
