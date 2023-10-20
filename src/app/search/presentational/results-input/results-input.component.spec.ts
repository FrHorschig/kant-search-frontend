import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsInputComponent } from './results-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

describe('ResultsInputComponent', () => {
  let component: ResultsInputComponent;
  let fixture: ComponentFixture<ResultsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsInputComponent],
      imports: [
        TranslateModule.forRoot(),
        ButtonModule,
        FormsModule,
        TooltipModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onUpdateEmitter with searchString when onSearchUpdate is called', () => {
    const searchString = 'test search string';
    spyOn(component.onUpdateEmitter, 'emit');
    component.searchString = searchString;
    component.onSearchUpdate();
    expect(component.onUpdateEmitter.emit).toHaveBeenCalledWith(searchString);
  });
});
