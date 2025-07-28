import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient } from '@angular/common/http';
import {
  ReadService,
  SearchService,
  UtilService,
} from '@frhorschig/kant-search-api';
import { all } from 'src/app/search/model/search-options';

export interface WorkGroup {
  translateString: string;
  codes: string[];
}

export interface Startpage {
  de: string;
  en: string;
}

interface ConfigState {
  korporaUrl: string;
  workGroups: WorkGroup[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigStore extends ComponentStore<ConfigState> {
  constructor(
    private readonly http: HttpClient,
    private readonly readService: ReadService,
    private readonly searchService: SearchService,
    private readonly utilService: UtilService
  ) {
    super({ korporaUrl: '', workGroups: [] });
  }

  readonly korporaUrl$ = this.select((state) => state.korporaUrl);
  readonly workGroups$ = this.select((state) => state.workGroups);

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any>('assets/config.json').subscribe({
        next: (config) => {
          if (!config.korporaUrl) {
            reject('Invalid configuration: korporaUrl is missing');
            return;
          }
          for (let wg of config.workGroups) {
            wg.codes.sort();
          }
          this.patchState({
            korporaUrl: config.korporaUrl,
            workGroups: [all, ...config.workGroups],
          });

          if (!config.apiUrl) {
            reject('Invalid configuration: apiUrl is missing');
            return;
          }
          this.readService.configuration.basePath = config.apiUrl;
          this.searchService.configuration.basePath = config.apiUrl;
          this.utilService.configuration.basePath = config.apiUrl;
          resolve();
        },

        error: (err) => {
          console.error('Failed to load config:', err);
          reject(err);
        },
      });
    });
  }
}
