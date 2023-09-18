const createReadServiceSpy = () =>
  jasmine.createSpyObj('ReadService', ['getVolumes', 'getWorks']);
const createErrorServiceSpy = () =>
  jasmine.createSpyObj('ErrorService', ['logError']);
