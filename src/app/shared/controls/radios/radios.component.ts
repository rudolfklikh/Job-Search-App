import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-radios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiosComponent),
      multi: true,
    },
  ],
})
export class RadiosComponent implements OnInit, ControlValueAccessor {
  @Input() items: ControlItem[] = [];
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;

  private propagateChange: any = () => {};

  constructor() {}

  ngOnInit(): void {}
  registerOnTouched(fn: any): void {}

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  identify(_: number, item: ControlItem) {
    return item.label;
  }

  onChanged(value: Value): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }


  isChecked(value: Value): boolean {
    return this.value === value;
  }
}
