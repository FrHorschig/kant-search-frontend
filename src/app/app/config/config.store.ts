import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient } from '@angular/common/http';
import { ReadService, SearchService } from '@frhorschig/kant-search-api';

export interface Config {
  korporaUrl: string;
}

interface ConfigState {
  config: Config;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigStore extends ComponentStore<ConfigState> {
  constructor(
    private readonly http: HttpClient,
    private readonly readService: ReadService,
    private readonly searchService: SearchService
  ) {
    super({ config: { korporaUrl: '' } });
  }

  readonly config$ = this.select((state) => state.config);

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any>('assets/config.json').subscribe({
        next: (config) => {
          if (!config.korporaUrl) {
            reject('Invalid configuration: korporaUrl is missing');
            return;
          }
          this.patchState({ config: { korporaUrl: config.korporaUrl } });

          if (!config.apiUrl) {
            reject('Invalid configuration: apiUrl is missing');
            return;
          }
          this.readService.configuration.basePath = config.apiUrl;
          this.searchService.configuration.basePath = config.apiUrl;
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
