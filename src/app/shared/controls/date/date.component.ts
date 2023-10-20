import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


type Value = number;

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  
  @Input() placeholder = ''
  @Input() min!: Date | null;
  @Input() max!: Date | null;
  @Output() changed = new EventEmitter<Value | null>();
  @Output() closed = new EventEmitter<void>();

  value!: Value | null;
  isDisabled!: boolean;

  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  
  registerOnTouched(fn: any): void {;
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : null;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }
}