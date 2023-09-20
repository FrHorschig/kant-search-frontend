import { Volume, Work } from 'kant-search-api';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { State, initialState, worksFeature } from './works.reducers';
import { Testdata } from 'src/app/common/test/testdata';

describe('WorksReducers', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = worksFeature.reducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should reset the state', () => {
    const prevState: State = {
      volumes: Testdata.volumes,
      volumeById: new Map<number, Volume>([[1, Testdata.volume]]),
      works: Testdata.works,
      workById: new Map<number, Work>([[1, Testdata.work]]),
      isLoaded: true,
    };
    const action = loadWorks();
    const state = worksFeature.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it('should populate data and set isLoaded to true', () => {
    const action = loadWorksSuccess({
      volumes: Testdata.volumes,
      works: Testdata.works,
    });
    const state = worksFeature.reducer(initialState, action);
    expect(state).toEqual({
      volumes: Testdata.volumes,
      volumeById: new Map<number, Volume>([[1, Testdata.volume]]),
      works: Testdata.works,
      workById: new Map<number, Work>([[1, Testdata.work]]),
      isLoaded: true,
    });
  });
});
