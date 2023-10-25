import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { User } from './list.models';

import * as fromActions from './list.actions';

type Action = fromActions.All;

import { extractDocumentChangeActionData } from '@app/shared/utils/data';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  read$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.afs
          .collection<User>('users', (ref) =>
            ref.where('roleId', '==', 'employee')
          )
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes: DocumentChangeAction<any>[]) =>
              changes.map((x) => extractDocumentChangeActionData(x, false))
            ),
            map((items) => new fromActions.ReadSuccess(items as User[])),
            catchError((err) => of(new fromActions.ReadError(err.message)))
          )
      )
    );
  });
}
