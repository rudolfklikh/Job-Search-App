import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

import { Observable, Subject, finalize, lastValueFrom, takeUntil } from 'rxjs';
import { FileSizePipe } from "../../pipes/file-size/file-size.pipe";

@Component({
    selector: 'app-upload',
    standalone: true,
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    imports: [CommonModule, AngularFireStorageModule, FileSizePipe]
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file!: File | null;
  @Output() completed = new EventEmitter<string>();

  task!: AngularFireUploadTask;
  percentage$!: Observable<number | undefined>;
  snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  downloadURL!: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.startUpload();
  }


  startUpload(): void {
    const path = `${this.file?.type.split('/')[0]}/${Date.now()}_${this.file?.name}`;
    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();


    this.snapshot$.pipe(takeUntil(this.destroy), finalize(async () => {
      this.downloadURL = await lastValueFrom(storageRef.getDownloadURL());
      this.completed.next(this.downloadURL);

    })).subscribe();
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
