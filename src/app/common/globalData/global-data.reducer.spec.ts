import { loadGlobalData, globalDataLoaded } from './global-data.actions';
import { Volume, Work } from 'kant-search-api';
import {
  reducer,
  initialState,
  selectVolume,
  selectWork,
} from './global-data.reducer';

// TODO frhorsch: check tests and add some if necessary
describe('GlobalData Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const state = reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadGlobalData action', () => {
    it('should reset volumeById and workById', () => {
      const action = loadGlobalData();
      const state = reducer(initialState, action);

      expect(state.volumeById).toEqual({});
      expect(state.workById).toEqual({});
    });
  });

  describe('globalDataLoaded action', () => {
    it('should populate volumeById and workById', () => {
      const volumes: Volume[] = [
        { id: 0, title: 'Volume 1', section: 1 },
        { id: 1, title: 'Volume 2', section: 2 },
      ];
      const works: Work[] = [
        { id: 0, title: 'Work 0', ordinal: 0, volumeId: 0 },
        { id: 1, title: 'Work 1', ordinal: 1, volumeId: 1 },
      ];
      const action = globalDataLoaded({ volumes, works });

      const state = reducer(initialState, action);

      expect(state.volumeById).toEqual({
        1: volumes[0],
        2: volumes[1],
      });

      expect(state.workById).toEqual({
        3: works[0],
        4: works[1],
      });
    });
  });
});

describe('Selectors', () => {
  const volumes: Volume[] = [
    { id: 0, title: 'Volume 1', section: 1 },
    { id: 1, title: 'Volume 2', section: 2 },
  ];
  const works: Work[] = [
    { id: 0, title: 'Work 0', ordinal: 0, volumeId: 0 },
    { id: 1, title: 'Work 1', ordinal: 1, volumeId: 1 },
  ];
  const state = {
    volumeById: {
      1: volumes[0],
      2: volumes[1],
    },
    workById: {
      3: works[0],
      4: works[1],
    },
  };

  describe('selectVolume', () => {
    it('should select a volume by id', () => {
      const result = selectVolume(1)(state);

      expect(result).toBe(volumes[0]);
    });

    it('should return undefined if id not present', () => {
      const result = selectVolume(99)(state);

      expect(result).toBeUndefined();
    });
  });

  describe('selectWork', () => {
    it('should select a work by id', () => {
      const result = selectWork(3)(state);

      expect(result).toBe(works[0]);
    });

    it('should return undefined if id not present', () => {
      const result = selectWork(99)(state);

      expect(result).toBeUndefined();
    });
  });
});
