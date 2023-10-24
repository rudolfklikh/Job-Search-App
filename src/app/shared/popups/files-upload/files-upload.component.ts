import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadComponent } from './components/upload/upload.component';
import { FileSizePipe } from './pipes';
import { CropperComponent } from './components/cropper/cropper.component';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  standalone: true,
  imports: [CommonModule, DropZoneDirective, UploadComponent,CropperComponent, FileSizePipe],
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {
  isHovering!: boolean;

  files: Array<File | null> = [];
  filesURLs: string[] = [];
  imageFile!: File | null;
  isError!: boolean;


  onDropEvent(val: any) : HTMLInputElement { return val; }
  

  constructor(private dialogRef: MatDialogRef<FilesUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {}


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList | null): void {
    this.isError = false;

    if (this.data.crop && files!.length > 1) {
      this.isError = true;
      return;
    }


    if (this.data.crop && files!.length === 1 && files!.item(0)?.type.split('/')[0] === 'image') {
      this.imageFile = files!.item(0);
      return;
    }

    for (let i = 0; i < files!.length; i++) {
      this.files.push(files!.item(i));
    }
  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }

  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
