import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { StartpageComponent } from './app/startpage/startpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/de/startpage', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      { path: 'startpage', component: StartpageComponent },
      {
        path: 'read',
        loadChildren: () =>
          import('./read/read.module').then((m) => m.ReadModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
