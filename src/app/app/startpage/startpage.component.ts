import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StartpageStore } from './startpage.store';


@Component({
  selector: 'ks-startpage',
  templateUrl: './startpage.component.html',
  imports: [TranslateModule],
})
export class StartpageComponent {
  page$ = this.store.page$;
  ready$ = this.store.ready$;

  constructor(private readonly store: StartpageStore) {}
}
