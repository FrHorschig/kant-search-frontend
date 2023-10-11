import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LanguageStore } from '../../store/language/language.store';
import { ContainerComponent } from '../../common/base/container.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends ContainerComponent implements OnInit {
  currentLang: string = '';
  items: MenuItem[] = [
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

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly langStore: LanguageStore
  ) {
    super();
  }

  ngOnInit() {
    this.langStore.currentLanguage$
      .pipe(this.takeUntilDestroy())
      .subscribe((lang) => (this.currentLang = lang));
  }
}
