import { SearchScope } from 'kant-search-api';

export class SearchInput {
  constructor(
    public searchTerms = '',
    public excludedTerms = '',
    public scope = SearchScope.Paragraph
  ) {}
}
