import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextComponent } from './text/text.component';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionComponent,
  },
  {
    path: 'text/:workId',
    component: TextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadRoutingModule {}
