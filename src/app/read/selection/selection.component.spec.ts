import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectionComponent } from './selection.component';
import { SelectionStore } from './selection.store';

describe('TocComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;
  let router: Router;
  let selectionStore = jasmine.createSpyObj('SelectionStore', [
    'loadData',
    'navigate',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionComponent, SelectionStore],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
    })
      .overrideProvider(SelectionComponent, { useValue: selectionStore })
      .compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the appropriate route when showText is called', () => {
    const workId = 'workId';
    // WHEN
    component.navigate(workId);
    // THEN
    expect(selectionStore).toHaveBeenCalledWith(workId);
  });
});
