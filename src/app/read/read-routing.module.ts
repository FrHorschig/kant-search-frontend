import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TocComponent } from './container/toc/toc.component';
import { ReadComponent } from './container/read/read.component';

const routes: Routes = [
  {
    path: 'toc',
    component: TocComponent,
  },
  {
    path: 'text/:workId',
    component: ReadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadRoutingModule {}
