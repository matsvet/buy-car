import { IFilter, IFilterState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchFilter, fetchMarks, fetchModels, updateFilter } from './thunks';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: IFilterState = {
  filter: null,
  loading: false,
  error: null,
  marks: null,
  models: null,
  cities: null,
  loadingModels: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.filter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.filter = action.payload as IFilter;
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      })

      .addCase(updateFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.filter = action.payload.filterData;
      })
      .addCase(updateFilter.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      })

      .addCase(fetchMarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.marks = action.payload;
      })
      .addCase(fetchMarks.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      })

      .addCase(fetchModels.pending, (state) => {
        state.loadingModels = true;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loadingModels = false;
        state.error = null;
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loadingModels = false;
        sliceCaseErrorHandler(state, action);
      })

      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
