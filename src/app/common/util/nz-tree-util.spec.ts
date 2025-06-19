import { Testdata } from '../test/testdata';
import { NzTreeUtil } from './nz-tree-util';

describe('NzTreeUtil', () => {
  it('should create nodes from volumes', () => {
    const mockVolumes = [Testdata.volume, Testdata.volume2];
    mockVolumes[0].works = [Testdata.work, Testdata.work2];
    mockVolumes[1].works = [Testdata.work3];

    const result = NzTreeUtil.createNodes(
      mockVolumes,
      100,
      (num, title) => `${num}: ${title}`
    );

    expect(result.length).toEqual(2);
    const v1 = result[0];
    expect(v1.children?.length).toEqual(2);
    expect(v1.title).toEqual(
      `${mockVolumes[0].volumeNumber}: ${mockVolumes[0].title}`
    );
    expect(v1.key).toEqual(`volume-${mockVolumes[0].volumeNumber}`);
    const w1 = v1.children?.at(0);
    expect(w1?.title).toEqual(Testdata.work.title);
    expect(w1?.key).toEqual(Testdata.work.code);
    const w2 = v1.children?.at(1);
    expect(w2?.title).toEqual(Testdata.work2.title);
    expect(w2?.key).toEqual(Testdata.work2.code);

    const v2 = result[1];
    expect(v2.children?.length).toEqual(1);
    expect(v2.title).toEqual(
      `${mockVolumes[1].volumeNumber}: ${mockVolumes[1].title}`
    );
    expect(v2.key).toEqual(`volume-${mockVolumes[1].volumeNumber}`);
    const w3 = v2.children?.at(0);
    expect(w3?.title).toEqual(Testdata.work3.title);
    expect(w3?.key).toEqual(Testdata.work3.code);
  });
});
