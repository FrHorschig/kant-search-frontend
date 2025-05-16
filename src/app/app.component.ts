import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WorksStore } from './store/works/works.store';

@Component({
  selector: 'ks-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  showButton: boolean = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly worksStore: WorksStore
  ) {
    this.translateService.setDefaultLang('de');
    this.worksStore.loadData();
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
