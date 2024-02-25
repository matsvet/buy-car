import { CaseReducer } from '@reduxjs/toolkit';

export interface IFilterState {
  loading: boolean;
  error: string | null;
  filter: IFilter | null;
  cities: string[] | null;
  marks: string[] | null;
  models: string[] | null;
  loadingModels: boolean;
}

export interface ReducersType {
  clearFilter: CaseReducer<IFilterState>;
}

export interface IFilter {
  // id: string;
  userId: string;
  priceMin?: number | null;
  priceMax?: number | null;
  mileageMin?: number | null;
  mileageMax?: number | null;
  yearMin?: number | null;
  yearMax?: number | null;
  ownersCountMin?: number | null;
  ownersCountMax?: number | null;
  mark?: string | null;
  model?: string | null;
  settlement?: string | null;
  isShowroom?: boolean | null;
  sorting?: string | null;
}
