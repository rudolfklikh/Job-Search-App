import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from '../date/date.component';

export interface Value {
  from: number;
  to: number;
}

export interface PlaceHolder {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DateComponent],
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: PlaceHolder = { from: '', to: '' };
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;

  form!: FormGroup;

  get min(): Date | null {
    const from = this.form.controls['from'].value;
    return from ? new Date(from) : null;
  }

  get max(): Date | null {
    const to = this.form.controls['to'].value;
    return to ? new Date(to) : null;
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null]
    })
  }

  writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  
  registerOnTouched(fn: any): void {;
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  onChanged(): void {
    const value = { ...this.form.value };

    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }
}
