import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvancedOptions } from '../../model/search-options';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchScope } from '@frhorschig/kant-search-api';
import { FormComponent } from 'src/app/common/base/form.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RightLabeledInputComponent } from 'src/app/common/shared/right-labeled-input/right-labeled-input.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'ks-advanced-input',
  templateUrl: './advanced-input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NzSpaceModule,
    NzTypographyModule,
    NzCardModule,
    NzSwitchModule,
    NzDividerModule,
    RightLabeledInputComponent,
  ],
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
