import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.less'],
})
export class LinkButtonComponent {
  @Input() anchor = '';

  constructor(private location: Location) {}

  addAnchor(event: Event) {
    event.stopPropagation();
    const currentUrl = this.location.path();
    const urlWithAnchor = `${currentUrl}#${this.anchor}`;
    this.location.go(urlWithAnchor);
  }
}
