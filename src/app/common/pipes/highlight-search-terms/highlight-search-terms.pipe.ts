import { Pipe, PipeTransform } from '@angular/core';
import { newStemmer } from 'snowball-stemmers';

@Pipe({
  name: 'highlightSearchTerms',
})
export class HighlightSearchTermsPipe implements PipeTransform {
  private stemmer = newStemmer('german');
  private opening = '<span class="ks-highlight">';
  private closing = '</span>';

  transform(text: string, searchTerms: string[]): string {
    const stemmedTerms = this.getStemmedTerms(searchTerms);
    const words = text.split(' ').map((word) => {
      let [alphaNum, punctuation] = this.splitWord(word);
      const stemmedAlphaNum = this.stemmer.stem(alphaNum);
      for (const term of stemmedTerms) {
        if (stemmedAlphaNum.toLowerCase() === term.toLowerCase()) {
          alphaNum = `${this.opening}${alphaNum}${this.closing}${punctuation}`;
          break;
        }
      }
      return alphaNum;
    });
    return words.join(' ');
  }

  private getStemmedTerms(terms: string[]): string[] {
    const stemmedTerms: string[] = [];
    for (let term of terms) {
      stemmedTerms.push(this.stemmer.stem(term));
    }
    return stemmedTerms;
  }

  private splitWord(word: string): [string, string] {
    const match = word.match(/^(.*?)([.,;!?]?)$/);
    return match ? [match[1], match[2]] : [word, ''];
  }
}
