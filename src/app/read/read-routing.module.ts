import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalModeComponent } from './normal-mode/normal-mode.component';

const routes: Routes = [
  {
    path: 'normal',
    component: NormalModeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadRoutingModule {}
