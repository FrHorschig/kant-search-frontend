import { Volume, Work } from 'kant-search-api';
import { loadWorks, loadWorksSuccess } from './works.actions';
import { State, initialState, worksFeature } from './works.reducers';

// TODO frhorsch: check tests and add some if necessary
describe('GlobalData Reducer', () => {
  const mockVolume: Volume = { id: 0, title: 'Volume 1', section: 1 };
  const mockWork: Work = { id: 0, title: 'Work 0', ordinal: 0, volumeId: 0 };
  const mockVolumes = [mockVolume];
  const mockWorks = [mockWork];

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = worksFeature.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('loadWorks action', () => {
    it('should reset the state', () => {
      const prevState: State = {
        volumes: mockVolumes,
        volumeById: { 1: mockVolume },
        works: mockWorks,
        workById: { 1: mockWork },
        isLoaded: true,
      };
      const action = loadWorks();
      const state = worksFeature.reducer(prevState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('loadWorksSuccess action', () => {
    it('should populate data and set isLoaded to true', () => {
      const action = loadWorksSuccess({
        volumes: mockVolumes,
        works: mockWorks,
      });
      const state = worksFeature.reducer(initialState, action);
      expect(state).toEqual({
        volumes: mockVolumes,
        volumeById: { 1: mockVolume },
        works: mockWorks,
        workById: { 1: mockWork },
        isLoaded: true,
      });
    });
  });
});
