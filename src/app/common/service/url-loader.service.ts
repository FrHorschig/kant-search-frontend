import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReadService, SearchService } from '@frhorschig/kant-search-api';

@Injectable({
  providedIn: 'root',
})
export class UrlLoaderService {
  constructor(
    private readonly http: HttpClient,
    private readonly readService: ReadService,
    private readonly searchService: SearchService,
  ) {}

  adjustBasePath(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('assets/config.json').subscribe({
        next: (config) => {
          this.readService.configuration.basePath = config.apiUrl;
          this.searchService.configuration.basePath = config.apiUrl;
          resolve();
        },
        error: (err) => {
          // TODO frhorschig
          reject(err);
        },
      });
    });
  }
}
