import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaComponent } from './criteria/criteria.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: CriteriaComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
