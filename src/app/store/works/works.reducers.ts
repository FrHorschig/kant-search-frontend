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
  volumeById: Map<number, Volume>;
  works: Work[];
  workById: Map<number, Work>;
  isLoaded: boolean;
}

export const initialState: State = {
  volumes: [],
  volumeById: new Map<number, Volume>(),
  works: [],
  workById: new Map<number, Work>(),
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
        volumeById: new Map<number, Volume>(),
        works: [],
        workById: new Map<number, Work>(),
        isLoaded: false,
      };
    }),
    on(loadWorksSuccess, (state, { volumes, works }) => {
      const volumesMap = new Map<number, Volume>();
      volumes.forEach((volume) => {
        volumesMap.set(volume.id, volume);
      });
      const worksMap = new Map<number, Work>();
      works.forEach((work) => {
        worksMap.set(work.id, work);
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
  createSelector(selectVolumeById, (volumeById) => volumeById.get(id));
export const selectWork = (id: number) =>
  createSelector(selectWorkById, (workById) => workById.get(id));
