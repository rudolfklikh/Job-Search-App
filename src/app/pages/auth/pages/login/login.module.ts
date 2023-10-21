import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonComponent, FormFieldComponent, InputComponent, PasswordComponent } from '@app/shared';
import { SpinnerComponent } from '@app/shared/indicators';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        FormFieldComponent,
        InputComponent,
        PasswordComponent,
        ButtonComponent,
        SpinnerComponent,
    ]
})
export class LoginModule { }
