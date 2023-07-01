import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPreviousRoutingModule } from './view-previous-routing.module';
import { ViewAllComponent } from './view-all/view-all.component';


@NgModule({
  declarations: [
    ViewAllComponent
  ],
  imports: [
    CommonModule,
    ViewPreviousRoutingModule
  ]
})
export class ViewPreviousModule { }
