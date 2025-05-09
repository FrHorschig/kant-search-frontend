import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MenuItemCommandEvent, MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { Router, RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockMessageService = jasmine.createSpyObj('MessageService', ['clear']);
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        TabMenuModule,
        MenuModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize navbar items correctly', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toBe(3);

    expect(component.items[0].label).toBeUndefined;
    expect(component.items[1].label).toBe('NAVBAR.READ');
    expect(component.items[2].label).toBe('NAVBAR.SEARCH');

    expect(component.items[0].icon).toBe('pi pi-home');
    expect(component.items[1].icon).toBe('pi pi-eye');
    expect(component.items[2].icon).toBe('pi pi-search');
  });

  it('should navigate to /startpage and clear messages when the READ command is executed', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.items[0].command!({} as MenuItemCommandEvent);
    expect(mockMessageService.clear).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/de/startpage']);
  });

  it('should navigate to /read/toc and clear messages when the READ command is executed', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.items[1].command!({} as MenuItemCommandEvent);
    expect(mockMessageService.clear).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/de/read/toc']);
  });

  it('should navigate to /search and clear messages when the SEARCH command is executed', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.items[2].command!({} as MenuItemCommandEvent);
    expect(mockMessageService.clear).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/de/search']);
  });
});
