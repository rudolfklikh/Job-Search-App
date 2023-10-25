import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from 'firebase/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { extractDocumentChangeActionData } from '@app/shared/utils/data';

import { Job, JobCreateRequest } from './list.models';

import * as fromActions from './list.actions';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  read$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.afs
          .collection('jobs', (ref) => ref.orderBy('created'))
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes) =>
              changes.map((x) => extractDocumentChangeActionData(x))
            ),
            map((items) => new fromActions.ReadSuccess(items as Job[])),
            catchError((err) => of(new fromActions.ReadError(err.message)))
          )
      )
    );
  });

  create$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.job),
      map((job: JobCreateRequest) => ({
        ...job,
        created: serverTimestamp(),
      })),
      switchMap((request: JobCreateRequest) =>
      from(this.afs.collection('jobs').add(request)).pipe(
        map((res) => ({ ...request, id: res.id })),
        map((job: Job) => new fromActions.CreateSuccess(job)),
        catchError((err) => of(new fromActions.CreateError(err.message)))
      )
    )
    );
  });

  update$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: fromActions.Update) => action.job),
      map((job: Job) => ({
        ...job,
        updated: serverTimestamp(),
      })),
      switchMap((job) =>
      from(this.afs.collection('jobs').doc(job.id).set(job)).pipe(
        map(() => new fromActions.UpdateSuccess(job.id, job)),
        catchError((err) => of(new fromActions.UpdateError(err.message)))
      )
    )
    );
  });

  delete$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Types.DELETE),
      map((action: fromActions.Delete) => action.id),
      switchMap((id) =>
      from(this.afs.collection('jobs').doc(id).delete()).pipe(
        map(() => new fromActions.DeleteSuccess(id)),
        catchError((err) => of(new fromActions.DeleteError(err.message)))
      )
    )
    );
  });
}
