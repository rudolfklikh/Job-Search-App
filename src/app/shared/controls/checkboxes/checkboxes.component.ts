import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true,
    },
  ],
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
  @Input() items: ControlItem[] | undefined = [];
  @Output() changed = new EventEmitter<Value[]>();

  value!: Value[];
  isDisabled!: boolean;

  private propagateChange: any = () => {};

  constructor() {}

  ngOnInit(): void {}
  registerOnTouched(fn: any): void {}

  writeValue(value: Value[]): void {
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

  onChanged(value: Value, event: Event): void {
    const isChecked = (<HTMLInputElement>event.target).checked;
    const selected = this.getSelected(value, isChecked);

    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];
    checked
      ? !selected.includes(value)
        ? selected.push(value)
        : ''
      : selected.splice(selected.indexOf(value), 1);

    return selected.length ? selected : [];
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }
}
