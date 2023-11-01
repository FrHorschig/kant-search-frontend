import { createAction, props } from '@ngrx/store';
import { Volume, Work } from '@frhorschig/kant-search-api';

export const loadWorks = createAction('[Works] Load Works');
export const loadWorksSuccess = createAction(
  '[Works] Works loaded successfully',
  props<{ volumes: Volume[]; works: Work[] }>()
);
