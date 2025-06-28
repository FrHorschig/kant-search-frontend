import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageStore } from '../../common/store/language.store';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AsyncPipe,
    TranslateModule,
    NzFlexModule,
    NzMenuModule,
    NzIconModule,
  ],
})
export class NavbarComponent {
  availableLanguages$ = this.langStore.availableLanguages$;
  currentLanguage$ = this.langStore.currentLanguage$;

  constructor(private readonly langStore: LanguageStore) {}

  updateLang(lang: string) {
    this.langStore.updateCurrentLanguage(lang);
  }
}
