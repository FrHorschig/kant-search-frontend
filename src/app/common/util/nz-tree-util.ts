import { Volume } from '@frhorschig/kant-search-api';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TitleUtil } from './title-util';

export class NzTreeUtil {
  static createNodes(
    volumes: Volume[],
    workTitleLen: number,
    volTitleFunc: (volNum: number, volTitle: string) => string
  ): NzTreeNodeOptions[] {
    return volumes.map((vol) => {
      const children = vol.works.map((work) => ({
        title: TitleUtil.truncate(work.title, workTitleLen),
        key: work.code,
        isLeaf: true,
        selectable: false,
      }));
      return {
        title: volTitleFunc(vol.volumeNumber, vol.title),
        key: `volume-${vol.volumeNumber}`,
        children: children,
        selectable: false,
      };
    });
  }
}
