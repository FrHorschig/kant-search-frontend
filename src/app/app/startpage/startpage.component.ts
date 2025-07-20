import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StartpageStore } from './startpage.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ks-startpage',
  templateUrl: './startpage.component.html',
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class StartpageComponent {
  page$ = this.store.page$;
  ready$ = this.store.ready$;

  constructor(private readonly store: StartpageStore) {}
}
