import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TocComponent } from './toc.component';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({ selector: 'app-works-menu', template: '' })
class MockWorksMenuComponent {
  @Input() isSelectable = true;
}

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TocComponent, MockWorksMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the appropriate route when showText is called', () => {
    const works = [{ id: '12345' }] as any[];
    const navigateSpy = spyOn(router, 'navigate');
    // WHEN
    component.showText(works);
    // THEN
    expect(navigateSpy).toHaveBeenCalledWith(['/read/text', '12345']);
  });

  it('should not navigate if works array is empty', () => {
    const works = [] as any[];
    const navigateSpy = spyOn(router, 'navigate');
    // WHEN
    component.showText(works);
    // THEN
    expect(navigateSpy).not.toHaveBeenCalled;
  });
});
