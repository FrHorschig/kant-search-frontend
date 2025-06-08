import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockMessageService = jasmine.createSpyObj('MessageService', ['clear']);
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: NzNotificationService, useValue: mockMessageService },
      ],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
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

  it('should navigate to /start and clear messages when the READ command is executed', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.items[0].command!({} as MenuItemCommandEvent);
    expect(mockMessageService.clear).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/de/start']);
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
