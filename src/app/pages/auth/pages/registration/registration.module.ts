import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ButtonComponent, FormFieldComponent, InputComponent, PasswordComponent } from '@app/shared';
import { SpinnerComponent } from '@app/shared/indicators';


@NgModule({
    declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormFieldComponent,
        InputComponent,
        PasswordComponent,
        ButtonComponent,
        SpinnerComponent,
    ]
})
export class RegistrationModule { }
