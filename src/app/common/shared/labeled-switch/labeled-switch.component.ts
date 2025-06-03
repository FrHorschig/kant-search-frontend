import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-labeled-switch',
  templateUrl: './labeled-switch.component.html',
  standalone: false,
})
export class LabeledSwitchComponent {
  @Input() idString = '';
  @Input() i18nString = '';
}
