import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';

import { ButtonComponent } from '@app/shared/buttons';
import { FormFieldComponent, InputComponent, PasswordComponent, SelectComponent } from '@app/shared/controls';


@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    PasswordComponent,
    SelectComponent,
  ]
})
export class SharedModule { }
