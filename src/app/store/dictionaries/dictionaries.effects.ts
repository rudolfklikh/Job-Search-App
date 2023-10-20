import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, take, zip } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ControlItem,
  Dictionaries,
  Dictionary,
  Item,
} from './dictionaries.models';

import * as fromActions from './dictionaries.actions';
import * as jsonCountries from '../../../assets/countries.json';

type Action = fromActions.All;

const documentToItem = (x: DocumentChangeAction<any>): Item => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id,
    ...data,
  };
};

const itemToControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon,
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map((x) => itemToControlItem(x)),
});

@Injectable()
export class DictionariesEffects {
  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  private getAfsSnapshot(key: string): Observable<Item[]> {
    return this.afs
      .collection(key)
      .snapshotChanges()
      .pipe(
        take(1),
        map((roles) => roles.map((role) => documentToItem(role)))
      );
  }

  read$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        zip(
          this.getAfsSnapshot('roles'),
          this.getAfsSnapshot('specializations'),
          this.getAfsSnapshot('qualifications'),
          this.getAfsSnapshot('skills'),
          of((jsonCountries as any).default.map((country: any) => ({
            id: country.code.toUpperCase(),
            name: country.name,
            icon: {
              src: null,
              cssClass: `fflag fflag-${country.code.toUpperCase()}`
            }
          })))
        ).pipe(
          map((collections) =>
            collections.map((collection) => addDictionary(collection))
          ),
          switchMap(([roles, specializations, qualifications, skills, countries]) =>
            of(
              new fromActions.ReadSuccess({
                roles,
                specializations,
                qualifications,
                skills,
                countries
              })
            )
          ),
          catchError((err) => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
