import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() options: AdvancedOptions | null = null;

  @Output() optionsChangeEmitter = new EventEmitter<AdvancedOptions>();

  scopes = Object.values(SearchScope);
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      includeFootnotes: [this.options?.includeFootnotes],
      includeHeadings: [this.options?.includeHeadings],
      includeSummaries: [this.options?.includeSummaries],
    });
    this.form.valueChanges
      .pipe(this.takeUntilDestroy())
      .subscribe((options) => this.optionsChangeEmitter.emit(options));
  }
}
