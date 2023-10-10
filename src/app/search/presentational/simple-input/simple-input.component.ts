import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { Section, SimpleInput } from '../../model/simple-input';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
})
export class SimpleInputComponent implements OnInit {
  @Input() nodes: TreeNode[] = [];

  @Output() simpleInputEmitter = new EventEmitter<SimpleInput>();
  @Output() worksEmitter = new EventEmitter<Work[]>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  showWorksMenu = false;
  isCustomSelection = false;
  customSelectOption = [{ label: 'CUSTOM', value: Section.CUSTOM }];
  simpleSelectOptions = [
    { label: 'ALL', value: Section.ALL },
    { label: 'SECTION_1', value: Section.SEC1 },
    { label: 'SECTION_2', value: Section.SEC2 },
    { label: 'SECTION_3', value: Section.SEC3 },
  ];
  form: FormGroup = this.formBuilder.group({
    section: Section.ALL,
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
      this.form.setValue({ section: Section.ALL });
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
