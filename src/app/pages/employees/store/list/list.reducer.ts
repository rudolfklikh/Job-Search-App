import { User } from './list.models';
import * as fromActions from './list.actions';

export interface ListState {
    items: User[] | null;
    loading: boolean | null;
    error: string | null;
}

export const initialState: ListState = {
    items: null,
    loading: null,
    error: null
};

export function reducer(state: ListState = initialState, action: fromActions.All) {
    switch (action.type) {

        // Read

        case fromActions.Types.READ: {
            return { ...state, loading: true, error: null };
        }

        case fromActions.Types.READ_SUCCESS: {
            return { ...state, items: action.items, loading: false };
        }

        case fromActions.Types.READ_ERROR: {
            return { ...state, loading: false, error: action.error };
        }

        default: {
            return state;
        }

    }
}
