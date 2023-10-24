import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components/stepper/stepper.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import {
  AutocompleteComponent,
  ButtonComponent,
  CheckboxesComponent,
  DateComponent,
  DateRangeComponent,
  FormFieldComponent,
  InputComponent,
  RadiosComponent,
  SelectComponent,
} from '@app/shared';
import { FilesUploadModule } from '@app/shared/popups';
import { SpinnerComponent } from '@app/shared/indicators';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPhotoComponent } from '@app/shared/layout';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { ExperiencesComponent } from './components/professional/roles/employee/experiences/experiences.component';
import { MapperService } from './services/mapper/mapper.service';

@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    RecruiterComponent,
    EmployeeComponent,
    ExperiencesComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FilesUploadModule,
    StepperModule,
    FormFieldComponent,
    DateRangeComponent,
    RadiosComponent,
    InputComponent,
    AutocompleteComponent,
    SpinnerComponent,
    UserPhotoComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxesComponent,
  ],
  providers: [MapperService],
})
export class FormModule {}
