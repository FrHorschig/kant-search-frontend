import { createFeature, createReducer, on } from '@ngrx/store';
import { Volume, Work } from 'kant-search-api';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { Section } from 'src/app/search/model/simple-input';

export const globalDataFeatureKey = 'globalData';

export interface State {
  volumes: Volume[];
  volumeById: Map<number, Volume>;
  works: Work[];
  workById: Map<number, Work>;
  worksBySection: Map<Section, Work[]>;
  isLoaded: boolean;
}

export const initialState: State = {
  volumes: [],
  volumeById: new Map<number, Volume>(),
  works: [],
  workById: new Map<number, Work>(),
  worksBySection: new Map<Section, Work[]>(),
  isLoaded: false,
};

export const worksFeature = createFeature({
  name: 'works',
  reducer: createReducer(
    initialState,
    on(loadWorks, (state) => {
      return {
        ...state,
        volumes: [],
        volumeById: new Map<number, Volume>(),
        works: [],
        workById: new Map<number, Work>(),
        worksBySection: new Map<Section, Work[]>(),
        isLoaded: false,
      };
    }),
    on(loadWorksSuccess, (state, { volumes, works }) => {
      const volumesById = new Map<number, Volume>();
      volumes.forEach((volume) => {
        volumesById.set(volume.id, volume);
      });
      const workById = new Map<number, Work>();
      works.forEach((work) => {
        workById.set(work.id, work);
      });
      return {
        ...state,
        volumes,
        volumeById: volumesById,
        works,
        workById: workById,
        worksBySection: getWorksBySection(works, volumesById),
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
  selectWorksBySection,
  selectIsLoaded,
} = worksFeature;

const getWorksBySection = (works: Work[], volumesById: Map<number, Volume>) => {
  const worksBySection = new Map<Section, Work[]>([
    [Section.ALL, []],
    [Section.SEC1, []],
    [Section.SEC2, []],
    [Section.SEC3, []],
  ]);
  works.forEach((work) => {
    worksBySection.get(Section.ALL)?.push(work);
    const sec = volumesById.get(work.volumeId)?.section;
    if (sec == 1) {
      worksBySection.get(Section.SEC1)?.push(work);
    } else if (sec == 2) {
      worksBySection.get(Section.SEC2)?.push(work);
    } else if (sec == 3) {
      worksBySection.get(Section.SEC3)?.push(work);
    }
  });
  return worksBySection;
};
