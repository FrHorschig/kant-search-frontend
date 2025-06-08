import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VolumesStore } from './store/volumes/volumes.store';
import { NavbarComponent } from './app/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'ks-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NavbarComponent,
    NzButtonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  showButton = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly volStore: VolumesStore
  ) {
    this.translateService.setDefaultLang('de');
    this.volStore.loadData();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showButton = window.scrollY > 200;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
