import { CaseReducer } from '@reduxjs/toolkit';

export interface IFilterState {
  loading: boolean;
  error: string | null;
  filter: IFilter | null;
}

export type ReducersType = {
  clearFilter: CaseReducer<IFilterState>;
};

export interface IFilter {
  id: string;
}
