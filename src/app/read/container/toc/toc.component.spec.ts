import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TocComponent } from './toc.component';
import { Router } from '@angular/router';
import { MockWorksMenuComponent } from 'src/app/common/test/mocks';
import { Testdata } from 'src/app/common/test/testdata';
import { provideMockStore } from '@ngrx/store/testing';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
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
    const work = Testdata.work;
    const navigateSpy = spyOn(router, 'navigate');
    // WHEN
    component.showText(work);
    // THEN
    expect(navigateSpy).toHaveBeenCalledWith(['/read/text', 1]);
  });
});
