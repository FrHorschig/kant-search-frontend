import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'NAVBAR.READ',
      icon: 'pi pi-eye',
      command: () => {
        this.messageService.clear();
        this.router.navigate(['/read/toc']);
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
    private readonly messageService: MessageService
  ) {}
}
