import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchOptions } from '../../model/search-output';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchScope } from '@frhorschig/kant-search-api';

@Component({
    selector: 'ks-advanced-input',
    templateUrl: './advanced-input.component.html',
    standalone: false
})
export class AdvancedInputComponent implements OnInit {
  @Output() optionsChangeEmitter = new EventEmitter<SearchOptions>();

  scopes = Object.values(SearchScope);
  form: FormGroup = this.formBuilder.group({
    scope: SearchScope.Paragraph,
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((options) =>
      this.optionsChangeEmitter.emit(options)
    );
  }
}
