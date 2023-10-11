export const createTranslateServiceSpy = () =>
  jasmine.createSpyObj('TranslateService', ['get']);

export const createScrollServiceSpy = () =>
  jasmine.createSpyObj('ScrollService', ['scrollToAnchor']);
