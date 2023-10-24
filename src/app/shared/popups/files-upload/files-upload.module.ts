import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadDirective } from './files-upload.directive';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FilesUploadDirective],
  imports: [CommonModule, MatDialogModule],
  exports: [FilesUploadDirective],
})
export class FilesUploadModule {}
