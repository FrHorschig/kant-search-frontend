import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { ErrorService } from 'src/app/common/service/error.service';
import { LanguageStore } from 'src/app/common/store/language.store';

@Injectable({ providedIn: 'root' })
export class StartpageStore {
  private readonly http = inject(HttpClient);
  private readonly errorService = inject(ErrorService);
  private readonly langStore = inject(LanguageStore);

  private readonly page = signal('');
  private readonly ready = signal(false);

  readonly page$ = this.page.asReadonly();
  readonly ready$ = this.ready.asReadonly();

  constructor() {
    const currentLang = toSignal(this.langStore.currentLanguage$, {
      initialValue: 'en',
    });
    const langReady = toSignal(this.langStore.ready$, { initialValue: false });

    effect(() => {
      if (!langReady()) return;
      this.page.set('');
      this.ready.set(false);

      this.http
        .get(`assets/startpage/${currentLang()}.html`, { responseType: 'text' })
        .subscribe({
          next: (html) => {
            this.page.set(html);
            this.ready.set(true);
          },
          error: (err) => {
            this.errorService.logError(err);
            this.ready.set(false);
          },
        });
    });
  }
}
