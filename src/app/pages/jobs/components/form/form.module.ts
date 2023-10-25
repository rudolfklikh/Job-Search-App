import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent, FormFieldComponent } from '@app/shared/controls';
import { ButtonComponent } from '@app/shared/buttons';

import { FormComponent } from './form.component';


@NgModule({
    declarations: [FormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputComponent,
        FormFieldComponent,
        ButtonComponent,
    ]
})
export class FormModule { }
