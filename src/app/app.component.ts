import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VolumesStore } from './store/volumes/volumes.store';
import { NavbarComponent } from './app/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'ks-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NavbarComponent,
    NzFlexModule,
    NzSpaceModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private readonly translateService: TranslateService,
    private readonly volStore: VolumesStore
  ) {
    this.translateService.setDefaultLang('de');
    this.volStore.loadData();
  }
}
