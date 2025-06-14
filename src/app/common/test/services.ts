export const createTranslateServiceSpy = () => {
  return jasmine.createSpyObj('TranslateService', ['get', 'instant']);
};

export const createScrollServiceSpy = () =>
  jasmine.createSpyObj('ScrollService', ['scrollToAnchor']);

export const createErrorServiceSpy = () =>
  jasmine.createSpyObj('ErrorService', ['logError']);
