import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { WorksActions } from './store/works';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  showButton: boolean = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly store: Store
  ) {
    this.translateService.setDefaultLang('en');
    this.store.dispatch(WorksActions.loadWorks());
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 200) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
