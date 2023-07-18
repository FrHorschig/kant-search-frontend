import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkComponent } from './add-work/add-work.component';

const routes: Routes = [
  {
    path: 'add-work',
    component: AddWorkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRoutingModule {}
