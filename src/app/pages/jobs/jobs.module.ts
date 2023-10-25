import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '@app/shared';
import { JobComponent } from './components/job/job.component';
import { FormModule } from './components/form/form.module';


@NgModule({
  declarations: [
    JobsComponent,
    JobComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    MatDialogModule,
    FormModule,
    ButtonComponent,
    StoreModule.forFeature('jobs', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class JobsModule { }
