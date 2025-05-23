import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MockWorksMenuComponent } from 'src/app/common/test/mocks';
import { Testdata } from 'src/app/common/test/testdata';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { TocComponent } from './toc.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;
  let router: Router;
  let worksStore = jasmine.createSpyObj('WorksStore', ['loadData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TocComponent, MockWorksMenuComponent],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
    })
      .overrideProvider(VolumesStore, { useValue: worksStore })
      .compileComponents();

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
    expect(navigateSpy).toHaveBeenCalledWith(['/de/read/text', 1]);
  });

  it('should toggle the node in the worksMenuStore', () => {
    // GIVEN
    const key = 'someKey';
    spyOn(component['worksMenuStore'], 'toggleNode');
    // WHEN
    component.toggleNode(key);
    // THEN
    expect(component['worksMenuStore'].toggleNode).toHaveBeenCalledWith(key);
  });
});
