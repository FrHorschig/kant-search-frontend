import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ErrorService } from './error.service';
import { createMessageServiceSpy } from '../test/primeng-services';
import { TranslateService } from '@ngx-translate/core';
import { createTranslateServiceSpy } from '../test/serivces';
import { of } from 'rxjs';

describe('ErrorService', () => {
  let sut: ErrorService;
  let messageService: jasmine.SpyObj<MessageService>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    messageService = createMessageServiceSpy();
    translateService = createTranslateServiceSpy();
    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageService },
        { provide: TranslateService, useValue: translateService },
      ],
    });

    sut = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should clear previous messages and log a message with a parameter', () => {
    const msg = 'Test Error';
    // GIVEN
    translateService.get.and.returnValue(of('Test text'));
    // WHEN
    sut.logError(msg, ['test']);
    // THEN
    expect(messageService.clear).toHaveBeenCalled();
    expect(translateService.get).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });

  it('should clear previous messages and log a message with undefined parameter', () => {
    const msg = 'Test Error';
    // GIVEN
    translateService.get.and.returnValue(of('Test text'));
    // WHEN
    sut.logError(msg, undefined);
    // THEN
    expect(messageService.clear).toHaveBeenCalled();
    expect(translateService.get).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });
});
