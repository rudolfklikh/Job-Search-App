import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';

import { ButtonComponent } from '@app/shared/buttons';
import {
  AutocompleteComponent,
  CheckboxesComponent,
  DateComponent,
  DateRangeComponent,
  FormFieldComponent,
  InputComponent,
  PasswordComponent,
  RadiosComponent,
  SelectComponent,
} from '@app/shared/controls';
import { SpinnerComponent } from '@app/shared/indicators';
import { FilesUploadModule } from '@app/shared/popups';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FilesUploadModule,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    PasswordComponent,
    SelectComponent,
    CheckboxesComponent,
    RadiosComponent,
    DateComponent,
    DateRangeComponent,
    AutocompleteComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
