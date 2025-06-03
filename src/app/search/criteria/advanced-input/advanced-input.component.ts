import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdvancedOptions } from '../../model/search-options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchScope } from '@frhorschig/kant-search-api';
import { FormComponent } from 'src/app/common/base/form.component';

@Component({
  selector: 'ks-advanced-input',
  templateUrl: './advanced-input.component.html',
  standalone: false,
})
export class AdvancedInputComponent extends FormComponent implements OnInit {
  @Output() optionsChangeEmitter = new EventEmitter<AdvancedOptions>();

  scopes = Object.values(SearchScope);
  form: FormGroup = this.formBuilder.group({
    includeHeadings: [true],
    includeFootnotes: [true],
    includeSummaries: [true],
  });

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(this.takeUntilDestroy())
      // TODO make this work correctly
      .subscribe((options) => this.optionsChangeEmitter.emit(options));
  }
}
