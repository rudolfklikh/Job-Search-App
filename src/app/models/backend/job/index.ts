import * as firestore from 'firebase/firestore';

export interface Job {
    title: string;
    salary: number;
    created: firestore.FieldValue;
    updated?: firestore.FieldValue;
}
