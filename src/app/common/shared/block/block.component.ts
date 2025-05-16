import { Component, Input } from '@angular/core';

@Component({
    selector: 'ks-text-block',
    templateUrl: './block.component.html',
    standalone: false
})
export class TextBlockComponent {
  @Input() text: string = '';
}
