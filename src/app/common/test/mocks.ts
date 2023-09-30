import { Component, Input } from '@angular/core';

@Component({ selector: 'app-works-menu', template: '' })
export class MockWorksMenuComponent {
  @Input() nodes: any;
}

@Component({ selector: 'app-checkbox-works-menu', template: '' })
export class MockCheckboxWorksMenuComponent {
  @Input() nodes: any;
}
