import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvancedOptions, ResultSort } from '../../model/search-options';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RightLabeledInputComponent } from 'src/app/search/criteria/advanced-input/right-labeled-input/right-labeled-input.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LeftLabeledInputComponent } from './left-labeled-input/left-labeled-input.component';

@Component({
  selector: 'ks-advanced-input',
  templateUrl: './advanced-input.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSpaceModule,
    NzTypographyModule,
    NzCardModule,
    NzSwitchModule,
    NzDividerModule,
    NzSelectModule,
    RightLabeledInputComponent,
    LeftLabeledInputComponent,
  ],
})
export class AdvancedInputComponent
  extends SubscriptionComponent
  implements OnInit
{
  @Input() options: AdvancedOptions | null = null;

  @Output() optionsChangeEmitter = new EventEmitter<AdvancedOptions>();

  sortOptions = Object.values(ResultSort);
  sort: ResultSort = ResultSort.AaOrder;
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sort: [this.options?.sort],
      withStemming: [this.options?.withStemming],
      includeFootnotes: [this.options?.includeFootnotes],
      includeHeadings: [this.options?.includeHeadings],
      includeSummaries: [this.options?.includeSummaries],
    });
    this.form.valueChanges
      .pipe(this.takeUntilDestroy())
      .subscribe((options) => this.optionsChangeEmitter.emit(options));
  }
}
