import { Section } from 'src/app/search/model/simple-input';
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
      volumes: [Testdata.volume, Testdata.volume2],
      volumeById: Testdata.volumeById,
      works: [Testdata.work, Testdata.work2],
      workById: Testdata.workById,
      worksBySection: Testdata.worksBySection,
      isLoaded: true,
    };
    const action = loadWorks();
    const state = worksFeature.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it('should populate data and set isLoaded to true', () => {
    const action = loadWorksSuccess({
      volumes: [Testdata.volume, Testdata.volume2, Testdata.volume3],
      works: [Testdata.work, Testdata.work2, Testdata.work3],
    });
    const state = worksFeature.reducer(initialState, action);
    expect(state).toEqual({
      volumes: [Testdata.volume, Testdata.volume2, Testdata.volume3],
      volumeById: Testdata.volumeById,
      works: [Testdata.work, Testdata.work2, Testdata.work3],
      workById: Testdata.workById,
      worksBySection: Testdata.worksBySection,
      isLoaded: true,
    });
  });
});
