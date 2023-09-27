import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from './result-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';

describe('ResultListComponent', () => {
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
    component.workById = new Map([[1, { title: 'title' } as Work]]);
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onMatchClick(
      Testdata.matchInfo.workId,
      Testdata.matchInfo.match,
      Testdata.matchInfo.index
    );
    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith(Testdata.matchInfo);
  });

  it('should emit the clicked match with shortened title', () => {
    const longTitle = 'a very long title with many many many, very many words';
    const shortTitleInfo = {
      workId: 1,
      workTitle: 'a very long title with many many many...',
      match: Testdata.match,
      index: 1,
    };
    // GIVEN
    component.workById = new Map([[1, { id: 1, title: longTitle } as Work]]);
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onMatchClick(1, Testdata.match, 1);
    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith(shortTitleInfo);
  });

  it('should emit the clicked match with abbreviation', () => {
    const abbrevTitleInfo = {
      workId: 1,
      workTitle: 'abbreviation',
      match: Testdata.match,
      index: 1,
    };
    // GIVEN
    component.workById = new Map([
      [1, { id: 1, abbreviation: 'abbreviation' } as Work],
    ]);
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onMatchClick(1, Testdata.match, 1);
    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith(abbrevTitleInfo);
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
});
