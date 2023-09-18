import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as GlobalDataActions from './global-data.actions';
import { Volume, Work } from 'kant-search-api';

export const globalDataFeatureKey = 'globalData';

interface VolumeById {
  [id: number]: Volume;
}
interface WorkById {
  [id: number]: Work;
}

export interface State {
  volumeById: VolumeById;
  workById: WorkById;
}

export const initialState: State = {
  volumeById: {},
  workById: {},
};

export const globalDataFeature = createFeature({
  name: 'globalData',
  reducer: createReducer(
    initialState,
    on(GlobalDataActions.loadGlobalData, (state) => {
      return {
        ...state,
        volumeById: {},
        workById: {},
      };
    }),
    on(GlobalDataActions.globalDataLoaded, (state, { volumes, works }) => {
      const volumesMap: VolumeById = {};
      volumes.forEach((volume) => {
        volumesMap[volume.id] = volume;
      });
      const worksMap: WorkById = {};
      works.forEach((work) => {
        worksMap[work.id] = work;
      });
      return {
        ...state,
        volumeById: volumesMap,
        workById: worksMap,
      };
    })
  ),
});

export const { reducer, selectVolumeById, selectWorkById } = globalDataFeature;

export const selectVolume = (id: number) =>
  createSelector(selectVolumeById, (volumeById) => volumeById[id]);
export const selectWork = (id: number) =>
  createSelector(selectWorkById, (workById) => workById[id]);
