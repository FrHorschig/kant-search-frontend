import { Volume, Work } from 'kant-search-api';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { State, initialState, worksFeature } from './works.reducers';

const mockVolume: Volume = { id: 1, title: 'Volume 1', section: 1 };
const mockWork: Work = { id: 1, title: 'Work 1', ordinal: 0, volumeId: 1 };

describe('WorksReducers', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = worksFeature.reducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should reset the state', () => {
    const prevState: State = {
      volumes: [mockVolume],
      volumeById: new Map<number, Volume>([[1, mockVolume]]),
      works: [mockWork],
      workById: new Map<number, Work>([[1, mockWork]]),
      isLoaded: true,
    };
    const action = loadWorks();
    const state = worksFeature.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it('should populate data and set isLoaded to true', () => {
    const action = loadWorksSuccess({
      volumes: [mockVolume],
      works: [mockWork],
    });
    const state = worksFeature.reducer(initialState, action);
    expect(state).toEqual({
      volumes: [mockVolume],
      volumeById: new Map<number, Volume>([[1, mockVolume]]),
      works: [mockWork],
      workById: new Map<number, Work>([[1, mockWork]]),
      isLoaded: true,
    });
  });
});
