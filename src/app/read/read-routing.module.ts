import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TocSectionComponent } from './text/toc/section/section.component';
import { TextComponent } from './text/text.component';

const routes: Routes = [
  {
    path: 'toc',
    component: TocSectionComponent,
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
