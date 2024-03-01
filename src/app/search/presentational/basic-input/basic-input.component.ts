import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Work } from '@frhorschig/kant-search-api';
import { TreeNode } from 'primeng/api';
import { SelectionGroup } from '../../model/selection-group';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
})
export class BasicInputComponent implements OnChanges {
  @Input() nodes: TreeNode[] = [];
  @Input() selectionGroup: SelectionGroup = SelectionGroup.ALL;

  @Output() worksEmitter = new EventEmitter<Work[]>();
  @Output() selectionGroupEmitter = new EventEmitter<SelectionGroup>();
  @Output() searchStringEmitter = new EventEmitter<string>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  showWorksMenu = false;
  isCustomSelection = false;
  workSelectOptions = [
    {
      label: 'SEARCH.INPUT.WORKS_BASIC_OPTIONS.ALL',
      value: SelectionGroup.ALL,
    },
    { label: 'SECTIONS.SEC_1', value: SelectionGroup.SEC1 },
    { label: 'SECTIONS.SEC_2', value: SelectionGroup.SEC2 },
    { label: 'SECTIONS.SEC_3', value: SelectionGroup.SEC3 },
    {
      label: 'SEARCH.INPUT.WORKS_BASIC_OPTIONS.CUSTOM',
      value: SelectionGroup.CUSTOM,
    },
  ];
  searchString = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const selectionGroupChanges = changes['selectionGroup'];
    if (selectionGroupChanges) {
      if (selectionGroupChanges.currentValue === SelectionGroup.CUSTOM) {
        this.isCustomSelection = true;
        this.showWorksMenu = true;
      } else {
        this.isCustomSelection = false;
      }
    }
  }

  onWorksMenuClick() {
    this.showWorksMenu = true;
  }

  onWorksChange(works: Work[]) {
    if (works.length > 0) {
      this.isCustomSelection = true;
    }
    this.selectionGroupEmitter.emit(SelectionGroup.CUSTOM);
    this.worksEmitter.emit(works);
  }

  onSelectionGroupChange(event: DropdownChangeEvent) {
    const newVal = event.value as SelectionGroup;
    if (newVal !== this.selectionGroup) {
      this.selectionGroupEmitter.emit(newVal);
    }
  }

  onSearchStringChange(searchString: string) {
    this.searchStringEmitter.emit(searchString);
  }

  onSubmit() {
    this.doSearchEmitter.emit();
  }
}
