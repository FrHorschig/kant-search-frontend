import { signal } from '@angular/core';

export class MockStartpageStore {
  private readonly page = signal('<p>Mock Startpage</p>');
  private readonly ready = signal(true);

  readonly page$ = this.page.asReadonly();
  readonly ready$ = this.ready.asReadonly();
}
