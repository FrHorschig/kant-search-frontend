import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ks-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.less'],
    standalone: false
})
export class LinkButtonComponent {
  @Input() anchor = '';

  constructor(private readonly location: Location) {}

  addAnchor(event: Event) {
    event.stopPropagation();
    const currentUrl = this.location.path();
    const urlWithAnchor = `${currentUrl}#${this.anchor}`;
    this.location.go(urlWithAnchor);
    // TODO frhorschig: show some kind of notification for the user that the url now includes the anchor
  }
}
