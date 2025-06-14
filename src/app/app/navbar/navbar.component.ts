import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageStore } from '../../store/language/language.store';
import { SubscriptionComponent } from '../../common/base/container.component';
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
export class NavbarComponent extends SubscriptionComponent {
  availableLanguages$ = this.langStore.availableLanguages$;
  currentLanguage$ = this.langStore.currentLanguage$;

  currentLang: string = '';

  constructor(private readonly langStore: LanguageStore) {
    super();
  }

  updateLang(lang: string) {
    this.langStore.updateCurrentLanguage(lang);
  }
}
