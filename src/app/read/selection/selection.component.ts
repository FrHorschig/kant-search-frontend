import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { SelectionStore } from './selection.store';

@Component({
  selector: 'ks-selection',
  templateUrl: './selection.component.html',
})
export class SelectionComponent extends ContainerComponent implements OnInit {
  volumes$ = this.store.volumes$;
  isLoaded$ = this.store.isLoaded$;

  constructor(private readonly store: SelectionStore) {
    super();
  }

  ngOnInit(): void {
    this.store.loadData();
  }

  navigate(workId: string) {
    this.store.navigateToText(workId);
  }
}
