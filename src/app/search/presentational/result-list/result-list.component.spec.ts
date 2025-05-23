import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from './result-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { Work } from '@frhorschig/kant-search-api';
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
    component.workById = new Map([
      [1, { code: 'code', abbreviation: 'code' } as Work],
    ]);
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

  it('should emit the clicked match with abbreviation', () => {
    const abbrevCodeInfo = {
      workId: 1,
      workCode: 'code',
      match: Testdata.match,
      index: 1,
    };
    // GIVEN
    component.workById = new Map([
      [1, { id: 1, code: 'code' } as Work],
    ]);
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onMatchClick(1, Testdata.match, 1);
    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith(abbrevCodeInfo);
  });

  it('should return the code of the work by id', () => {
    const code = 'Test Code';
    // WHEN
    component.workById = new Map([[1, { code: code } as Work]]);
    // THEN
    expect(component.getWorkCode(1)).toBe(code);
  });

  it('should return an empty string if work not found', () => {
    // GIVEN
    component.workById = null;
    // THEN
    expect(component.getWorkCode(1)).toBe('');
  });

  it('should return correct string when getAnchorId is called', () => {
    // THEN
    expect(component.getAnchorId(1, Testdata.match)).toBe('match-1-4-3');
  });
});
