import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService
  ) {}

  logError(msg: string, args: string[] | undefined) {
    this.messageService.clear();
    const summary$ = this.translateService.get('ERROR.SUMMARY');
    const argsObject = args
      ? args.reduce((acc: any, arg, index) => {
          acc[`param${index}`] = arg;
          return acc;
        }, {})
      : {};
    const msg$ = this.translateService.get('ERROR.' + msg, argsObject);
    forkJoin([summary$, msg$]).subscribe((translations) => {
      this.messageService.add({
        severity: 'error',
        summary: translations[0],
        detail: translations[1],
      });
    });
  }
}
