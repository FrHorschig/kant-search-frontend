import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ErrorService } from './error.service';
import { createMessageServiceSpy } from '../test/primeng-services';

describe('ErrorService', () => {
  let sut: ErrorService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        { provide: MessageService, useValue: createMessageServiceSpy() },
      ],
    });

    sut = TestBed.inject(ErrorService);
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  describe('logError', () => {
    it('should clear previous messages and log a new error message', () => {
      const msg = 'Test Error';
      // WHEN
      sut.logError(msg);
      // THEN
      expect(messageService.clear).toHaveBeenCalled();
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error',
        detail: msg,
      });
    });
  });
});
