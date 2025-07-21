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
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'ks-advanced-input',
  templateUrl: './advanced-input.component.html',
  styleUrl: './advanced-input.component.less',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSpaceModule,
    NzFlexModule,
    NzTypographyModule,
    NzCardModule,
    NzSwitchModule,
    NzDividerModule,
    NzSelectModule,
    RightLabeledInputComponent,
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
      includeHeadings: [this.options?.includeHeadings],
      includeParagraphs: [this.options?.includeParagraphs],
      includeFootnotes: [this.options?.includeFootnotes],
    });
    this.form.valueChanges
      .pipe(this.takeUntilDestroy())
      .subscribe((options) => this.optionsChangeEmitter.emit(options));
  }
}
