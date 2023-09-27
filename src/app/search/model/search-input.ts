import { SearchScope } from 'kant-search-api';

export class SearchInput {
  constructor(public searchString = '', public scope = SearchScope.Paragraph) {}
}
