import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { selectIsLoaded } from './works.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

export const worksGuard = () => {
  const workLoadedService = inject(WorksLoadedService);
  return workLoadedService.isLoaded;
};

@Injectable({
  providedIn: 'root',
})
export class WorksLoadedService {
  private subscription: Subscription;
  isLoaded = false;

  constructor(private store: Store) {
    this.subscription = this.store
      .select(selectIsLoaded)
      .subscribe((isLoaded) => {
        this.isLoaded = isLoaded;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
