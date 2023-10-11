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
      volumes: Testdata.volumes,
      works: [Testdata.work, Testdata.work2],
    });
    const state = worksFeature.reducer(initialState, action);
    expect(state).toEqual({
      volumes: Testdata.volumes,
      volumeById: Testdata.volumeById,
      works: [Testdata.work, Testdata.work2],
      workById: Testdata.workById,
      worksBySection: Testdata.worksBySection,
      isLoaded: true,
    });
  });
});
