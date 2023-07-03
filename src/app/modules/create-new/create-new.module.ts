import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewRoutingModule } from './create-new-routing.module';
import { CreateComponent } from './create/create.component';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateNewRoutingModule,
    SharedModule
  ]
})
export class CreateNewModule { }
