import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent implements OnInit {
  @Input() imageFile!: File;
  @Output() changed = new EventEmitter<File>();

  croppedImage!: ImageCroppedEvent;

  constructor() {}

  ngOnInit() {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  onCrop() {
    const createdFile = new File(
      [this.croppedImage.blob as Blob],
      this.imageFile.name
    );

    return this.changed.emit(createdFile);
  }
}
