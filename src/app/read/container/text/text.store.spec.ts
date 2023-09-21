import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TextStore } from './text.store';
import { MessageService } from 'primeng/api';
import { ReadService } from 'kant-search-api';
import { ErrorService } from 'src/app/common/service/error.service';

describe('TextStore', () => {
  let store: TextStore;
  let readService: jasmine.SpyObj<ReadService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    readService = jasmine.createSpyObj('ReadService', ['getParagraphs']);
    errorService = jasmine.createSpyObj('ErrorService', ['logError']);
    messageService = jasmine.createSpyObj('MessageService', ['clear']);

    TestBed.configureTestingModule({
      providers: [
        TextStore,
        { provide: ReadService, useValue: readService },
        { provide: ErrorService, useValue: errorService },
        { provide: MessageService, useValue: messageService },
      ],
    });

    store = TestBed.inject(TextStore);
  });

  it('should load paragraphs and update state on success', () => {
    // GIVEN
    (readService.getParagraphs as jasmine.Spy).and.returnValue(
      of([{ id: 1, text: 'Test Paragraph' }])
    );
    // WHEN
    store.loadParagraphs(1);
    // THEN
    store.paragraphs$.subscribe((paragraphs) => {
      expect(paragraphs).toEqual(paragraphs);
    });
    store.isLoaded$.subscribe((isLoaded) => {
      expect(isLoaded).toBeTrue();
    });
  });

  it('should handle error and log it', () => {
    // GIVEN
    readService.getParagraphs.and.returnValue(
      throwError(() => new Error('Test Error'))
    );
    // WHEN
    store.loadParagraphs(1);
    // THEN
    expect(errorService.logError).toHaveBeenCalledWith('Test Error');
  });
});
