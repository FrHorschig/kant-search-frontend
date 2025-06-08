import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-right-labeled-input',
  templateUrl: './right-labeled-input.component.html',
  standalone: false,
})
export class RightLabeledInputComponent {
  @Input() idString = '';
  @Input() i18nString = '';
}
