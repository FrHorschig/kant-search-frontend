import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { LinkButtonComponent } from './link-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

describe('LinkButtonComponent', () => {
  let component: LinkButtonComponent;
  let fixture: ComponentFixture<LinkButtonComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkButtonComponent],
      providers: [Location],
      imports: [TranslateModule.forRoot(), TooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkButtonComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add anchor to current URL and navigate to it', () => {
    spyOn(location, 'path').and.returnValue('/some/path');
    spyOn(location, 'go');

    component.anchor = 'section1';
    component.addAnchor(new Event('click'));

    expect(location.path).toHaveBeenCalledOnceWith();
    expect(location.go).toHaveBeenCalledOnceWith('/some/path#section1');
  });

  it('should stop event propagation', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    component.addAnchor(event);

    expect(event.stopPropagation).toHaveBeenCalledOnceWith();
  });
});
