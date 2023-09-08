import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface SearchUrlState {}

@Injectable()
export class SearchUrlStore extends ComponentStore<SearchUrlState> {
  constructor() {
    super({});
  }
}
