import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VolumesStore } from './store/volumes/volumes.store';

@Component({
    selector: 'ks-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {
  showButton: boolean = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly volStore: VolumesStore
  ) {
    this.translateService.setDefaultLang('de');
    this.volStore.loadData();
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
