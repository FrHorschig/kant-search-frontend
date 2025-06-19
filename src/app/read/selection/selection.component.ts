import { Component } from '@angular/core';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { LanguageStore } from 'src/app/common/store/language/language.store';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { SelectionStore } from './selection.store';

@Component({
  selector: 'ks-selection',
  templateUrl: './selection.component.html',
  standalone: true,
  providers: [SelectionStore],
  imports: [CommonModule, TranslateModule, NzSpaceModule, NzTreeModule],
})
export class SelectionComponent extends SubscriptionComponent {
  nodes$ = this.store.nodes$;
  ready$ = this.store.ready$;
  expandedKeys: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly langStore: LanguageStore,
    private readonly store: SelectionStore
  ) {
    super();
  }

  onNodeClick(event: NzFormatEmitEvent) {
    const key = event.node?.key ?? '';
    if (key.startsWith('volume-')) {
      const set = new Set(this.expandedKeys);
      if (set.has(key)) {
        set.delete(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(false);
      } else {
        set.add(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(true);
      }
    } else {
      this.langStore.currentLanguage$
        .pipe(this.takeUntilDestroy())
        .subscribe((lang) => this.router.navigate([lang, 'read', 'text', key]));
    }
  }
}
