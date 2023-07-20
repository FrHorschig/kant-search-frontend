import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
})
export class StartpageComponent {
  items: MenuItem[] = [
    {
      label: 'NAVBAR.READ',
      icon: 'pi pi-eye',
      command: () => this.router.navigate(['/read/normal']),
    },
    {
      label: 'NAVBAR.SEARCH',
      icon: 'pi pi-search',
      command: () => this.router.navigate(['/search']),
    },
    {
      label: 'NAVBAR.ADMIN',
      icon: 'pi pi-shield',
      command: () => this.router.navigate(['/admin']),
    },
  ];

  constructor(private readonly router: Router) {}
}
