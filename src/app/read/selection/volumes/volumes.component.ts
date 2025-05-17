import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Volume } from '@frhorschig/kant-search-api';

@Component({
  selector: 'ks-volumes',
  templateUrl: './volumes.component.html',
  standalone: false,
})
export class VolumesComponent {
  @Input() currentLang: string = '';
  @Input() volumes: Volume[] = [];

  hoverIndex = '';
}
