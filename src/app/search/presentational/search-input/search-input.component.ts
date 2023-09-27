import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchScope } from 'kant-search-api';
import { SearchInput } from '../../model/search-input';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() hasWorks = false;

  @Output() onSearch = new EventEmitter<SearchInput>();

  scopes = [SearchScope.Paragraph, SearchScope.Sentence];
  input = new SearchInput();
  form: FormGroup = this.formBuilder.group({
    searchString: [this.input.searchString, Validators.required],
    scope: [this.input.scope],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit() {
    this.onSearch.emit(this.form.value as SearchInput);
  }
}
