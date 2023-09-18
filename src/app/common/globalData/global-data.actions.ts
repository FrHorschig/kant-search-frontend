import { createAction, props } from '@ngrx/store';
import { Volume, Work } from 'kant-search-api';

export const loadGlobalData = createAction('[GlobalData] Load Data');

export const globalDataLoaded = createAction(
  '[GlobalData] Data Loaded',
  props<{ volumes: Volume[]; works: Work[] }>()
);
