import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from '@frhorschig/kant-search-api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
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
  imports: [
    ApiModule,
    HttpClientModule,
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
    ButtonModule,
    MessagesModule,
    TabMenuModule,
    TooltipModule,
    MenuModule,
  ],
  providers: [
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadBackendUrl,
      deps: [UrlLoaderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
