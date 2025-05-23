import { Component } from '@angular/core';
import { LanguageStore } from '../../store/language/language.store';
import { ContainerComponent } from '../../common/base/container.component';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
})
export class NavbarComponent extends ContainerComponent {
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
