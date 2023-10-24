import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { HighlightPipe } from './pipes/highlight.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ControlItem } from '@app/models/frontend';
import {
  Observable,
  Subject,
  startWith,
  filter,
  map,
  takeUntil,
  distinctUntilChanged,
} from 'rxjs';
import { Value } from '../date-range/date-range.component';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HighlightPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() items!: ControlItem[] | undefined;
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();
  options$!: Observable<ControlItem[] | undefined>;

  private destroy = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter((value) => typeof value === 'string' || typeof value === 'object'),
      map((value) => (typeof value === 'string' ? value : value.label)),
      map((label) => (label ? this.filter(label) : this.items?.slice()))
    );

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy), distinctUntilChanged())
      .subscribe((item) => {
        const value = typeof item === 'object' ? item.value : null;
        this.propagateChange(value);
        this.changed.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private filter(value: string): ControlItem[] | undefined {
    const filterValue = value.toLowerCase();
    return this.items?.filter((item) =>
      item.label.toLowerCase().includes(filterValue)
    );
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: Value): void {
    const selectedOption = this.items?.find((item) => (item.value as unknown as Value) === value);
    this.formControl.setValue(selectedOption);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  displayFn(item?: ControlItem): string {
    return item ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
