export const createReadServiceSpy = () =>
  jasmine.createSpyObj('ReadService', ['getVolumes', 'getWorks']);
export const createErrorServiceSpy = () =>
  jasmine.createSpyObj('ErrorService', ['logError']);
