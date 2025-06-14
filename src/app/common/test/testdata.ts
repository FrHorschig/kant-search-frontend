// import { Hit, Paragraph, Volume, Work } from '@frhorschig/kant-search-api';
// import { Hit } from 'src/app/search/model/search-result';

// export class Testdata {
//   static readonly volume: Volume = {
//     volumeNumber: 1,
//     section: 1,
//     title: 'Volume',
//     works: [],
//   };
//   static readonly volume2: Volume = {
//     volumeNumber: 2,
//     section: 2,
//     title: 'Volume 2',
//     works: [],
//   };
//   static readonly volume3: Volume = {
//     volumeNumber: 3,
//     section: 3,
//     title: 'Volume 2',
//     works: [],
//   };
//   static readonly work: Work = {
//     id: 'workId',
//     code: 'ABC',
//     siglum: 'Sgl 1',
//     year: '1234',
//     title: 'Work',
//     sections: [],
//   };
//   static readonly workRef: WorkRef = {
//     id: 'workId',
//     code: 'ABC',
//     title: 'Work',
//   };
//   static readonly work2: Work = {
//     id: 'workId2',
//     code: 'DEF',
//     title: 'Work 2',
//     sections: [],
//   };
//   static readonly workRef2: WorkRef = {
//     id: 'workId2',
//     code: 'DEF',
//     title: 'Work 2',
//   };
//   static readonly work3: Work = {
//     id: 'workId3',
//     code: 'GHI',
//     title: 'Work 3',
//     sections: [],
//   };
//   static readonly workRef3: WorkRef = {
//     id: 'workId3',
//     code: 'GHI',
//     title: 'Work 3',
//   };
//   static readonly volumeById = new Map<string, Volume>([
//     ['workId', this.volume],
//     ['workId2', this.volume2],
//     ['workId3', this.volume3],
//   ]);
//   static readonly workById = new Map<string, Work>([
//     ['workId', this.work],
//     ['workId2', this.work2],
//     ['workId3', this.work3],
//   ]);
//   static readonly worksBySection = new Map<number, Work[]>([
//     [0, [this.work, this.work2, this.work3]],
//     [1, [this.work]],
//     [2, [this.work2]],
//     [3, [this.work3]],
//   ]);

//   static readonly hit: Hit = {
//     contentId: 'contentId',
//     pages: [1, 2],
//     snippets: ['snippet 1', 'snippet 2'],
//   };
//   static readonly hitMetadata: HitData = {
//     workId: 'workId',
//     workCode: 'code',
//     hit: Testdata.hit,
//     index: 1,
//   };
//   static readonly paragraph: Paragraph = {
//     fnRefs: [],
//     id: 'paragraphId',
//     text: 'text',
//   };
// }
