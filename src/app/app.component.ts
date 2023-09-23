import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { WorksActions } from './store/works';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private readonly translateService: TranslateService,
    private readonly store: Store
  ) {
    this.translateService.setDefaultLang('en');
    this.store.dispatch(WorksActions.loadWorks());
  }
}
