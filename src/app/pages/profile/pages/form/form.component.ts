import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromUser from '@app/store/user';
import * as fromForm from '../../store/form';

import { Store, select } from '@ngrx/store';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapperService } from './services/mapper/mapper.service';

export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfessionalForm | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  dictionaries$!: Observable<fromDictionaries.Dictionaries | null>;
  dictionariesIsReady$!: Observable<boolean | null>;
  loading$!: Observable<boolean | null>;

  personal$!: Observable<PersonalForm>;
  professional$!: Observable<ProfessionalForm>;

  private profile$!: Observable<ProfileForm>;
  private user!: fromUser.User;
  private isEditing!: boolean;

  private destroy = new Subject<unknown>();

  get title(): string {
    return this.isEditing ? 'Edit Profile' : 'New Profile';
  }

  constructor(
    private store: Store<fromRoot.State>,
    public stepper: StepperService,
    private router: Router,
    private route: ActivatedRoute,
    private mapper: MapperService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(
      select(fromForm.getFormState)
    ) as Observable<ProfileForm>;
    this.personal$ = this.store.pipe(
      select(fromForm.getPersonalForm)
    ) as Observable<PersonalForm>;
    this.professional$ = this.store.pipe(
      select(fromForm.getProfessionalForm)
    ) as Observable<ProfessionalForm>;

    this.dictionariesIsReady$ = this.store.pipe(
      select(fromDictionaries.getIsReady)
    );
    this.dictionaries$ = this.store.pipe(
      select(fromDictionaries.getDictionaries)
    );

    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form));
    }

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepper.complete$
      .pipe(
        switchMap(() => zip(this.profile$, this.dictionaries$)),
        takeUntil(this.destroy)
      )
      .subscribe(([profile, dictionaries]) => {
        this.onComplete(profile, this.user, dictionaries);
      });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.router.navigate(['/profile', this.user.uid]);
    });
  }

  onChangedPersonal(data: PersonalForm): void {
    this.store.dispatch(new fromForm.Update({ personal: data }));
  }

  onChangedProfessional(data: ProfessionalForm): void {
    this.store.dispatch(new fromForm.Update({ professional: data }));
  }

  private onComplete(
    profile: ProfileForm,
    user: fromUser.User,
    dictionaries: fromDictionaries.Dictionaries | null
  ): void {
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(new fromUser.Create(request));
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
    this.store.dispatch(new fromForm.Clear());
  }
}
