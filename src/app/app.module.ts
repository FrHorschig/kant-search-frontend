import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ApiModule } from '@frhorschig/kant-search-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartpageComponent } from './app/startpage/startpage.component';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './app/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { worksFeature } from './store/works/works.reducers';
import { WorksEffects } from './store/works/works.effects';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
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
    StoreModule.forRoot({ works: worksFeature.reducer }),
    EffectsModule.forRoot([WorksEffects]),
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
