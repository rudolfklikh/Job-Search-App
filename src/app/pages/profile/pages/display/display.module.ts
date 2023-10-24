import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';
import { UserPhotoComponent } from '@app/shared/layout';
import { EmployeeComponent, RecruiterComponent } from './components';


@NgModule({
  declarations: [
    DisplayComponent,
    EmployeeComponent,
    RecruiterComponent,
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    UserPhotoComponent,
  ]
})
export class DisplayModule { }
