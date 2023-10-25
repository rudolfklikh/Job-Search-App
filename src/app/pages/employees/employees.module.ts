import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { reducers, effects } from './store';
import { UserPhotoComponent } from '@app/shared';
import { EmployeeComponent } from './components/employee/employee.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    StoreModule.forFeature('employees', reducers),
    EffectsModule.forFeature(effects),
    ProfileRoutingModule,
    UserPhotoComponent,
  ]
})
export class EmployeesModule { }
