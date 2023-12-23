import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LanguageStore } from '../../store/language/language.store';
import { ContainerComponent } from '../../common/base/container.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends ContainerComponent implements OnInit {
  availableLanguages$ = this.langStore.availableLanguages$;

  showLanguages = false;
  currentLang: string = '';
  items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      command: () => {
        this.messageService.clear();
        this.router.navigate([`/${this.currentLang}/startpage`]);
      },
    },
    {
      label: 'NAVBAR.READ',
      icon: 'pi pi-eye',
      command: () => {
        this.messageService.clear();
        this.router.navigate([`/${this.currentLang}/read/toc`]);
      },
    },
    {
      label: 'NAVBAR.SEARCH',
      icon: 'pi pi-search',
      command: () => {
        this.messageService.clear();
        this.router.navigate([`/${this.currentLang}/search`]);
      },
    },
    {
      label: 'NAVBAR.ADMIN',
      icon: 'pi pi-shield',
      command: () => {
        this.messageService.clear();
        this.router.navigate([`/${this.currentLang}/admin`]);
      },
    },
  ];
  langItems: MenuItem[] = [
    {
      icon: 'pi pi-globe',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly langStore: LanguageStore,
    private readonly translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.langStore.currentLanguage$
      .pipe(this.takeUntilDestroy())
      .subscribe((lang) => (this.currentLang = lang));
  }

  getItems(langs: string[]): MenuItem[] {
    return langs.map((lang) => {
      return {
        // TODO frhorschig: preload translation files
        label: this.translateService.instant(
          'NAVBAR.LANG.' + lang.toUpperCase()
        ),
        command: () => {
          this.langStore.updateCurrentLanguage(lang);
        },
      };
    });
  }
}
