import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { SearchStore } from './search.store';
import { TranslateModule } from '@ngx-translate/core';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { SimpleInputComponent } from '../../presentational/simple-input/simple-input.component';
import { AdvancedInputComponent } from '../../presentational/advanced-input/advanced-input.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'primeng/tree';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchStore = jasmine.createSpyObj(
    'SearchStore',
    ['putsearchString', 'putWorks', 'navigateSearch'],
    {
      isSearchPermitted$: of(false),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockCheckboxWorksMenuComponent,
        InputGroupComponent,
        SimpleInputComponent,
        AdvancedInputComponent,
      ],
      providers: [provideMockStore({})],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        ButtonModule,
        TooltipModule,
        DropdownModule,
        PanelModule,
        AccordionModule,
        DialogModule,
        TreeModule,
      ],
    }).compileComponents();
    TestBed.overrideProvider(SearchStore, { useValue: mockSearchStore });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
