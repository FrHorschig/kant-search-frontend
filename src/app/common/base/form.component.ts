import { Directive, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: 'formComponent',
  standalone: false,
})
export abstract class FormComponent implements OnDestroy {
  protected readonly onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  protected takeUntilDestroy<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.onDestroy$);
  }
}
