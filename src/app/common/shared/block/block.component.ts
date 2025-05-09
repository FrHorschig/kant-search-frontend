import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-text-block',
  templateUrl: './block.component.html',
})
export class TextBlockComponent {
  @Input() text: string = '';
}
