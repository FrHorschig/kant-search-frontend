import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from './result-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { Match, Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';

describe('ResultsComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultListComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the clicked match', () => {
    // GIVEN
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onMatchClick(Testdata.match);
    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith(Testdata.match);
  });

  it('should return the title of the work by id', () => {
    const title = 'Test Title';
    // WHEN
    component.workById = new Map([[1, { title: title } as Work]]);
    // THEN
    expect(component.getWorkTitle(1)).toBe(title);
  });

  it('should return an empty string if work not found', () => {
    // GIVEN
    component.workById = null;
    // THEN
    expect(component.getWorkTitle(1)).toBe('');
  });

  it('should return the volumeId of the work by id', () => {
    // GIVEN
    component.workById = new Map([[1, { volumeId: 2 } as Work]]);
    // THEN
    expect(component.getVolume(1)).toBe(2);
  });

  it('should return 0 if work not found', () => {
    // GIVEN
    component.workById = null;
    // THEN
    expect(component.getVolume(1)).toBe(0);
  });
});
