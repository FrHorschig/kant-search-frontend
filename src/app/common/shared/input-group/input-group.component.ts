import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-input-group',
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent {
  @Input() idString = '';
  @Input() i18nString = '';
}
