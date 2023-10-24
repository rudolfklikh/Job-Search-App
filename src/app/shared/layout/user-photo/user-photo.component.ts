import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-user-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPhotoComponent implements OnInit {

  @Input() photoURL!: string | null | undefined;

  constructor(private sanitizer: DomSanitizer) {}


  ngOnInit() {}

  get safePhotoURL(): SafeStyle | null {
    return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`) : null;
  }

}
