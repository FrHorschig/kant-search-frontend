import { Router } from '@angular/router';

export const createTranslateServiceSpy = () =>
  jasmine.createSpyObj('TranslateService', ['get', 'instant']);

export function createRouterSpy(): jasmine.SpyObj<Router> {
  return jasmine.createSpyObj('Router', ['navigate']);
}

export const createScrollServiceSpy = () =>
  jasmine.createSpyObj('ScrollService', ['scrollToAnchor']);

export const createErrorServiceSpy = () =>
  jasmine.createSpyObj('ErrorService', ['logError']);
