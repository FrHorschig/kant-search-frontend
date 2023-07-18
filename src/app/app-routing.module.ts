import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/startpage', pathMatch: 'full' },
  { path: 'startpage', component: StartpageComponent },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload/upload.module').then((m) => m.UploadModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
