import { Employee, Recruiter } from './roles';
import * as firestore from 'firebase/firestore';

export * from './roles';

export interface User {
    uid: string | null | undefined;
    name: string | null | undefined;
    photoURL: string | null | undefined;
    email: string | null | undefined;
    country: string | null | undefined;
    about?: string | null | undefined; 
    roleId: string | null | undefined;
    role: Employee | Recruiter | null | undefined; 
    created: firestore.FieldValue | null | undefined;
    updated?: firestore.FieldValue | null | undefined;
}
