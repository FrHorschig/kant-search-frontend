import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from 'kant-search-api';
import { HttpClientModule } from '@angular/common/http';
import { StartpageComponent } from './startpage/startpage.component';

@NgModule({
  declarations: [AppComponent, StartpageComponent],
  imports: [ApiModule, HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
