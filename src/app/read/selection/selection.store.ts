import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Volume } from '@frhorschig/kant-search-api';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';

interface SelectionState {
  volumes: Volume[];
  isLoaded: boolean;
}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  constructor() {
    super({ volumes: [], isLoaded: false });
  }

  readonly isLoaded$ = this.select((state) => state.isLoaded);
}
