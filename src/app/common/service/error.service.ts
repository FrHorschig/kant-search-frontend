import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpError } from '@frhorschig/kant-search-api';
import { MessageService } from 'primeng/api';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService
  ) {}

  logError(err: HttpError) {
    this.messageService.clear();
    const summary$ = this.translateService.get('ERROR.SUMMARY');
    const paramsObj = err.params
      ? err.params.reduce((acc: any, param, index) => {
          acc[`param${index}`] = param;
          return acc;
        }, {})
      : {};
    const msg$ = err.code
      ? this.translateService.get('ERROR.' + err.message, paramsObj)
      : this.wrapInObservable(err.message);
    forkJoin([summary$, msg$]).subscribe((translations) => {
      this.messageService.add({
        severity: 'error',
        summary: translations[0],
        detail: translations[1],
      });
    });
  }

  wrapInObservable(msg: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      subscriber.next(msg);
      subscriber.complete();
    });
  }
}
