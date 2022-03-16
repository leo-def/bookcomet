import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/_components/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'book',
    component: AdminComponent,
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  },
  {
    path: '',
    component: AdminComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
