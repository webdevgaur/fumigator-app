import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAllComponent,
    children: [
      {
        path: 'view-all',
        component: ViewAllComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPreviousRoutingModule { }
