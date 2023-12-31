import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() control!: AbstractControl | null;
  @Input() patternError!: string;
  @Input() isInline = true;

  get hasError(): boolean | null {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return this.control && this.control.errors && Object.keys(this.control.errors)[0];
  }


  ngOnInit(): void {

  }
}
