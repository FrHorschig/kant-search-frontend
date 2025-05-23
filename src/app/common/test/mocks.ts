import { Component, Input } from '@angular/core';

@Component({
    selector: 'ks-works-menu', template: '',
    standalone: false
})
export class MockWorksMenuComponent {
  @Input() nodes: any;
}

@Component({
    selector: 'app-checkbox-works-menu', template: '',
    standalone: false
})
export class MockCheckboxWorksMenuComponent {
  @Input() nodes: any;
  @Input() visible: any;
}
