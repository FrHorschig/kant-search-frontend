export const createMessageServiceSpy = () =>
  jasmine.createSpyObj('MessageService', ['clear', 'add']);
