import { SearchScope } from '@frhorschig/kant-search-api';

export class SearchOptions {
  constructor(public scope = SearchScope.Paragraph) {}
}
