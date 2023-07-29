import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TocComponent } from './container/toc/toc.component';
import { TextComponent } from './container/text/text.component';

const routes: Routes = [
  {
    path: 'toc',
    component: TocComponent,
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
