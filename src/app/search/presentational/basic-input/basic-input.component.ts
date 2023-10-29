import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { Section, BasicInput } from '../../model/simple-input';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
})
export class BasicInputComponent implements OnInit {
  @Input() nodes: TreeNode[] = [];

  @Output() simpleInputEmitter = new EventEmitter<BasicInput>();
  @Output() worksEmitter = new EventEmitter<Work[]>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  showWorksMenu = false;
  isCustomSelection = false;
  customSelectOption = [{ label: 'CUSTOM', value: Section.CUSTOM }];
  simpleSelectOptions = [
    { label: 'SEARCH.INPUT.WORKS_BASIC_OPTIONS.ALL', value: Section.ALL },
    { label: 'COMMON.SECTION_1', value: Section.SEC1 },
    { label: 'COMMON.SECTION_2', value: Section.SEC2 },
    { label: 'COMMON.SECTION_3', value: Section.SEC3 },
  ];
  form: FormGroup = this.formBuilder.group({
    section: new FormControl({
      value: Section.ALL,
      disabled: this.isCustomSelection,
    }),
    searchString: '',
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((options) =>
      this.simpleInputEmitter.emit(options)
    );
  }

  onWorksMenuClick() {
    if (this.isCustomSelection) {
      this.isCustomSelection = false;
      this.form.setValue({
        section: Section.ALL,
        searchString: this.form.value.searchString,
      });
    } else {
      this.showWorksMenu = true;
    }
  }

  onWorksChange(works: Work[]) {
    if (works.length > 0) {
      this.isCustomSelection = true;
    }
    this.worksEmitter.emit(works);
  }

  onSubmit() {
    this.doSearchEmitter.emit();
  }
}
