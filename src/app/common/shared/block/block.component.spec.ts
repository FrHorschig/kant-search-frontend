import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextBlockComponent } from './block.component';

describe('NormalModeComponent', () => {
  let component: TextBlockComponent;
  let fixture: ComponentFixture<TextBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
