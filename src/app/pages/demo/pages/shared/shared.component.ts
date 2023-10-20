import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline = true;
  emailPatternError = regexErrors.email;
  showSpinner = false;

  items: ControlItem[] = [
    {
      label: 'First',
      value: 1,
    },
    {
      label: 'Second',
      value: 2,
    },
    {
      label: 'Third',
      value: 3,
    },
    {
      label: 'Fourth',
      value: 4,
    },
    {
      label: 'Fifth',
      value: 5,
    },
  ];

  constructor(private fb: FormBuilder, private notification: NotificationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(regex.email),
          ],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      select: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      autocomplete: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      checkboxes: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      radios: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      date: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      dateRange: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 'ff@gmail.com',
      password: 'qwerty',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2019, 5, 10).getTime(),
        to: new Date(2019, 5, 25).getTime(),
      },
    });
  }
  onToggleInline() {
    this.isInline = !this.isInline;
  }

  onToggleDisable() {
    this.form.enabled ? this.form.disable() : this.form.enable();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onError(): void {
    this.notification.error('Oops! Something went wrong');
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }
}
