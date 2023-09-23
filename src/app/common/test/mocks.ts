import { Component, Input } from '@angular/core';

@Component({ selector: 'app-works-menu', template: '' })
export class MockWorksMenuComponent {
  @Input() isSelectable = true;
}
