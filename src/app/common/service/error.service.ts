import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpError } from '@frhorschig/kant-search-api';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly notificationService: NzNotificationService
  ) {}

  logError(err: Error) {
    const summary$ = this.translateService.get('ERROR.SUMMARY');
    if (
      err instanceof HttpErrorResponse &&
      typeof err.error === 'object' &&
      ('code' in err.error || 'message' in err.error || 'params' in err.error)
    ) {
      const e: HttpError = err.error;
      const paramsObj = e.params
        ? e.params.reduce((acc: any, param, index) => {
            acc[`param${index}`] = param;
            return acc;
          }, {})
        : {};
      const msg$ =
        e.code === 400
          ? this.translateService.get('ERROR.' + e.message, paramsObj)
          : this.translateService.get('ERROR.GENERIC');
      forkJoin([summary$, msg$]).subscribe(([summary, msg]) =>
        this.notificationService.error(summary, msg)
      );
    } else {
      const msg = err.message;
      console.error('error: ', msg);
      forkJoin([
        summary$,
        this.translateService.get('ERROR.GENERIC'),
      ]).subscribe(([summary, msg]) => {
        this.notificationService.error(summary, msg);
      });
    }
  }
}
