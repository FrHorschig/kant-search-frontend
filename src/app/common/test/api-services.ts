export const createReadServiceSpy = () =>
  jasmine.createSpyObj('ReadService', [
    'getFootnotes',
    'getHeadings',
    'getParagraphs',
    'getSummaries',
    'getVolumes',
  ]);
export const createSearchServiceSpy = () =>
  jasmine.createSpyObj('SearchService', ['search']);
