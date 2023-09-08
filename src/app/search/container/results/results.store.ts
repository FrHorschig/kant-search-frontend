import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface ResultsState {}

@Injectable()
export class ResultsStore extends ComponentStore<ResultsState> {
  constructor() {
    super({});
  }
}
