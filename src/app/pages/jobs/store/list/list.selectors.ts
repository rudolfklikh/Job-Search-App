import { createSelector } from '@ngrx/store';
import { getJobsState, JobsState } from '../index';

import { listAdapter } from './list.reducer';
import { Job } from './list.models';

export const getListState = createSelector(
    getJobsState,
    (state: JobsState) => state.list
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = listAdapter.getSelectors(getListState);

export const selectEntityById = createSelector(
    selectEntities,
    (entities: any, props: { id: string }) => {
        return entities[props.id];
    }
);
