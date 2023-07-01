import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewRoutingModule } from './create-new-routing.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateNewRoutingModule
  ]
})
export class CreateNewModule { }
