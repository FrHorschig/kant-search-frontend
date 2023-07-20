import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { NormalModeComponent } from './normal-mode/normal-mode.component';


@NgModule({
  declarations: [
    NormalModeComponent
  ],
  imports: [
    CommonModule,
    ReadRoutingModule
  ]
})
export class ReadModule { }
