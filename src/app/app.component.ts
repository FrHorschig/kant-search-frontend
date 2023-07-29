import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'NAVBAR.READ',
      icon: 'pi pi-eye',
      command: () => {
        this.messageService.clear();
        this.router.navigate(['/read']);
      },
    },
    {
      label: 'NAVBAR.SEARCH',
      icon: 'pi pi-search',
      command: () => {
        this.messageService.clear();
        this.router.navigate(['/search']);
      },
    },
    {
      label: 'NAVBAR.ADMIN',
      icon: 'pi pi-shield',
      command: () => {
        this.messageService.clear();
        this.router.navigate(['/admin']);
      },
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService
  ) {
    this.translateService.setDefaultLang('en');
  }
}
