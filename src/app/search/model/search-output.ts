import { SearchScope } from 'kant-search-api';

export class SearchOptions {
  constructor(public scope = SearchScope.Paragraph) {}
}
