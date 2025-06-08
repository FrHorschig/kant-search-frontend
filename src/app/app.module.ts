import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from '@frhorschig/kant-search-api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { StartpageComponent } from './app/startpage/startpage.component';
import { UrlLoaderService } from './common/service/url-loader.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function loadBackendUrl(urlLoader: UrlLoaderService) {
  return () => urlLoader.adjustBasePath();
}

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    NzFlexModule,
    NzIconModule,
    NzMenuModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadBackendUrl,
      deps: [UrlLoaderService],
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
