import { FormatPipe } from './format.pipe';
import { Paragraph } from '@frhorschig/kant-search-api';

describe('FormatPipe', () => {
  let pipe: FormatPipe = new FormatPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should wrap text with heading tag when headingLevel is provided', () => {
    const paragraph: Paragraph = {
      id: 1,
      text: '{p5} Hello World',
      pages: [1],
      workId: 1,
      headingLevel: 2,
      footnoteName: undefined,
    };
    const transformedText = pipe.transform(paragraph);
    expect(transformedText).toEqual('{p5} <h2>Hello World</h2>');
  });

  it('should wrap text with footnote tag when footnoteName is provided', () => {
    const paragraph: Paragraph = {
      id: 1,
      text: 'Hello World',
      pages: [1],
      workId: 1,
      headingLevel: undefined,
      footnoteName: '12.34',
    };
    const transformedText = pipe.transform(paragraph);
    expect(transformedText).toEqual(
      '<span id="12.34" class="ks-footnote"><sup><span class="ks-fn-ref">(12.34)</span></sup> Hello World</span>'
    );
  });

  it('should not modify text when neither headingLevel nor footnoteName is provided', () => {
    const paragraph: Paragraph = {
      id: 1,
      text: 'Hello World',
      pages: [1],
      workId: 1,
      headingLevel: undefined,
      footnoteName: undefined,
    };
    const transformedText = pipe.transform(paragraph);
    expect(transformedText).toEqual('Hello World');
  });

  it('should wrap text with heading and footnote tags when both are provided', () => {
    const paragraph: Paragraph = {
      id: 1,
      text: '{p5} Hello World',
      pages: [1],
      workId: 1,
      headingLevel: 3,
      footnoteName: '12.34',
    };
    const transformedText = pipe.transform(paragraph);
    expect(transformedText).toEqual(
      '<span id="12.34" class="ks-footnote"><sup><span class="ks-fn-ref">(12.34)</span></sup> {p5} <h3>Hello World</h3></span>'
    );
  });
});
