import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Volume, Work } from 'kant-search-api';
import { loadWorks, loadWorksSuccess } from './works.actions';

export const globalDataFeatureKey = 'globalData';

interface VolumeById {
  [id: number]: Volume;
}
interface WorkById {
  [id: number]: Work;
}

export interface State {
  volumes: Volume[];
  volumeById: VolumeById;
  works: Work[];
  workById: WorkById;
  isLoaded: boolean;
}

export const initialState: State = {
  volumes: [],
  volumeById: {},
  works: [],
  workById: {},
  isLoaded: false,
};

export const worksFeature = createFeature({
  name: 'globalData',
  reducer: createReducer(
    initialState,
    on(loadWorks, (state) => {
      return {
        ...state,
        volumes: [],
        volumeById: {},
        works: [],
        workById: {},
        isLoaded: false,
      };
    }),
    on(loadWorksSuccess, (state, { volumes, works }) => {
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
        volumes,
        volumeById: volumesMap,
        works,
        workById: worksMap,
        isLoaded: true,
      };
    })
  ),
});

export const {
  selectVolumes,
  selectVolumeById,
  selectWorks,
  selectWorkById,
  selectIsLoaded,
} = worksFeature;

export const selectVolume = (id: number) =>
  createSelector(selectVolumeById, (volumeById) => volumeById[id]);
export const selectWork = (id: number) =>
  createSelector(selectWorkById, (workById) => workById[id]);
