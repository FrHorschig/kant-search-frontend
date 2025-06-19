import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, filter, tap, withLatestFrom } from 'rxjs';
import { LanguageStore } from 'src/app/common/store/language/language.store';
import { AdvancedOptions, ResultSort } from '../model/search-options';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { VolumesStore } from 'src/app/common/store/volumes/volumes.store';
import { TranslateService } from '@ngx-translate/core';
import { TitleUtil } from '../../common/util/title-util';
import { NzTreeUtil } from 'src/app/common/util/nz-tree-util';

interface CriteriaState {
  nodes: NzTreeNodeOptions[];
  searchTerms: string;
  workCodes: string[];
  options: AdvancedOptions;
  ready: boolean;
}

@Injectable()
export class CriteriaStore extends ComponentStore<CriteriaState> {
  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly volStore: VolumesStore,
    private readonly langStore: LanguageStore
  ) {
    super({
      nodes: [],
      searchTerms: '',
      workCodes: [],
      options: {
        sort: ResultSort.AaOrder,
        withStemming: true,
        includeFootnotes: true,
        includeHeadings: false,
        includeSummaries: false,
      },
      ready: false,
    });
    this.init();
  }

  readonly nodes$ = this.select((state) => state.nodes);
  readonly options$ = this.select((state) => state.options);
  readonly canSearch$ = this.select(
    (state) => state.workCodes.length > 0 && state.searchTerms.length > 0
  );
  readonly ready$ = this.select((state) => state.ready);

  readonly navigateSearch = this.effect<void>((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.langStore.currentLanguage$, this.canSearch$),
      filter(([, , canSearch]) => canSearch),
      tap(([, lang]) => {
        const state = this.get();
        const queryParams: Params = {
          searchTerms: state.searchTerms,
          workCodes: state.workCodes.join(','),
        };
        if (state.options.sort === ResultSort.Year) {
          queryParams['sort'] = ResultSort.Year;
        }
        if (state.options.withStemming) {
          queryParams['stems'] = true;
        }
        if (state.options.includeFootnotes) {
          queryParams['incFn'] = true;
        }
        if (state.options.includeHeadings) {
          queryParams['incHead'] = true;
        }
        if (state.options.includeSummaries) {
          queryParams['incSumm'] = true;
        }
        this.router.navigate([lang, 'search', 'results'], {
          queryParams,
        });
      })
    )
  );

  readonly putSearchTerms = this.updater((state, searchTerms: string) => ({
    ...state,
    searchTerms,
  }));
  readonly putWorkCodes = this.updater((state, workCodes: string[]) => ({
    ...state,
    workCodes,
  }));
  readonly putOptions = this.updater((state, options: AdvancedOptions) => ({
    ...state,
    options,
  }));

  private readonly init = this.effect<void>((trigger$) =>
    combineLatest([
      trigger$,
      this.volStore.volumes$,
      this.langStore.ready$,
    ]).pipe(
      filter(([, , ready]) => ready),
      tap(([, vols]) => {
        this.patchState({
          nodes: NzTreeUtil.createNodes(vols, 85, (volNum, volTitle) =>
            this.translateService.instant('COMMON.VOL_WORK_TITLE', {
              volumeNumber: volNum,
              title: volTitle,
            })
          ),
          ready: true,
        });
      })
    )
  );
}
